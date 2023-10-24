package com.softleaf.groupware.controller;


import com.softleaf.groupware.config.jwt.JwtFilter;
import com.softleaf.groupware.config.jwt.TokenProvider;
import com.softleaf.groupware.dto.LoginDto;
import com.softleaf.groupware.dto.TokenDto;
import com.softleaf.groupware.dto.UserDTO;
import com.softleaf.groupware.service.MailService;
import com.softleaf.groupware.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;
    private final MailService mailService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public ApiController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder,
                         UserService userService, MailService mailService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * 로그인, 유저 토큰 발급
     * @param loginDto
     * @return
     * @throws Exception
     */
    @PostMapping("/authenticate")
    public ResponseEntity<HashMap<String, Object>> authorize(@RequestBody LoginDto loginDto) throws Exception {
        HashMap<String, Object> response = new HashMap<>();
        HttpHeaders httpHeaders = new HttpHeaders();
        response.put("status", "fail");

        UserDTO param = new UserDTO();
        param.setLoginId(loginDto.getLoginId());
        param.setPassword(loginDto.getPassword());
        param.setPageMode("AUTH_LOGIN");
        UserDTO user = userService.getUserInfo(param);

        if(user != null && "N".equals(user.getApprovYn())) {    // 가입 후, 인증을 안했을 경우
            response.put("status", "authFail");
        } else {
            // 로그인 처리
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);		// 여기서 loadUserByUsername 호출
            SecurityContextHolder.getContext().setAuthentication(authentication);		// 로그인 상태를 유지 ==> 인가

            String access_token = tokenProvider.createToken(authentication);    // access token 자주 갱신되는 토큰 값(보안상 앞단에 노출이 되기 때문에 자주 갱신이된다)
            String refresh_token = tokenProvider.createRefreshToken();          // refresh token DB에 저장되는 토큰 값(긴시간동안 세션을 유지시키게 한다.)
            String loginId = SecurityContextHolder.getContext().getAuthentication().getName(); // 암호화가 필요할 수 있다. -> 암호화 -> Spring 시큐리티
            //addTokenToCookie(response, jwt);

            int refResult = 0;
            HashMap<String, Object> map = new HashMap<>();
            if(loginId != null) {
                map.put("loginId", loginId);
                map.put("refreshToken", refresh_token);
                refResult = userService.updateRefreshToken(map);
            }

            if(refResult > 0 && access_token != null && refresh_token != null) {
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + access_token);
                httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, refresh_token);
            }

            response.put("status", "success");
            response.put("access_token", access_token);
            response.put("refresh_token", refresh_token);
        }
        // logger.debug("authentication.getAuthorities() ===>" + );

        return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
    }

    /**
     * access token 재발급
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/refreshToken")
    public ResponseEntity<TokenDto> refreshToken(HttpServletRequest request) throws Exception {
        String refreshToken = request.getHeader(JwtFilter.REFRESH_TOKEN_HEADER);

        logger.info("refresh_token ====> " + refreshToken);
        UserDTO user = userService.getUserRenew(refreshToken);

        if(user == null) {
            throw new Exception("유저 정보 조회 불가, 잘못된 경로로 접근하였습니다.");
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getLoginId(), user.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);		// 여기서 loadUserByUsername 호출
        SecurityContextHolder.getContext().setAuthentication(authentication);		// 로그인 상태를 유지 ==> 인가

        String accessToken = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();

        if(accessToken != null) {
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + accessToken);
            httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, refreshToken);
        } else {
            throw new Exception("access_token 발급 불가");
        }

        return new ResponseEntity<>(new TokenDto(accessToken, refreshToken), httpHeaders, HttpStatus.OK);
    }

    /**
     * 회원가입
     * @param userDto
     * @return
     * @throws Exception
     */
    @PostMapping("/sign-up")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
    public ResponseEntity<HashMap<String, Object>> signUp(@RequestBody /* Json으로 받음 */ UserDTO userDto) throws Exception {
        //return ResponseEntity.ok(userService.signup(userDto));
        return new ResponseEntity<>(userService.signup(userDto), HttpStatus.CREATED);
    }

    /**
     * 인증 완료 처리 & 인증 메일 재전송
     * @param userDTO
     * @return
     * @throws Exception
     */
    @PostMapping("/emails/auth-email-confirm")
    public ResponseEntity<HashMap<String, Object>> authEmailConfirm(@RequestBody UserDTO userDTO) throws Exception {
        logger.debug("authEmailConfirm ====> loginId : {}, mailKey : {}", userDTO.getLoginId(), userDTO.getMailKey());

        HashMap<String, Object> response = new HashMap<>();
        UserDTO param = new UserDTO();
        param.setLoginId(userDTO.getLoginId());
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        UserDTO user = userService.getUserInfo(param);
        if(user != null && user.getApprovYn().equals("N")
                && user.getLoginId().equals(userDTO.getLoginId())) {

            if(userDTO.getMailKey() != null && user.getMailKey().equals(userDTO.getMailKey())) {    // 인증 완료 처리
                HashMap<String,Object> map = new HashMap<>();
                map.put("loginId", userDTO.getLoginId());
                map.put("userId", user.getUserId());
                map.put("authName", "ROLE_USER");   // 사용자 정보로 인증 권한 삽입

                int sucFlg = userService.confirmAuthKay(map);    // 인증 키 삭제
                if(sucFlg > 0) {
                    status = HttpStatus.OK;
                    response.put("status", "success");
                    response.put("message", "mail auth");
                } else {
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                    response.put("status", "fail");
                }
            } else {
                if(userDTO.getMailKey() != null && !"".equals(userDTO.getMailKey())) {
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                    response.put("status", "fail");
                } else {    // 인증 메일 재전송
                    mailService.sendEmail(userDTO.getLoginId(), "AUTH");
                    status = HttpStatus.OK;
                    response.put("status", "success");
                    response.put("message", "send mail");
                }
            }
        }
        return new ResponseEntity<>(response, status);
    }

    /**
     * 비밀번호 초기화(임시비밀번호 발급)
     * @param userDTO -
     * @return -
     */
    @PostMapping("/emails/create-new-password")
    public ResponseEntity<HashMap<String, Object>> createNewPassword(@RequestBody UserDTO userDTO) {
        logger.debug("authEmailConfirm ====> loginId : {}", userDTO.getLoginId());
        HashMap<String, Object> response = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        try {
            mailService.sendEmail(userDTO.getLoginId(), "NEW_PASS");
            status = HttpStatus.OK;
            response.put("status", "success");
        } catch (Exception e) {
            response.put("status", "fail");
        }

        return new ResponseEntity<>(response, status);
    }
//}

}
