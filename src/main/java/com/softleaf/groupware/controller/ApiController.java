package com.softleaf.groupware.controller;


import com.softleaf.groupware.config.jwt.JwtFilter;
import com.softleaf.groupware.config.jwt.TokenProvider;
import com.softleaf.groupware.dto.LoginDto;
import com.softleaf.groupware.dto.TokenDto;
import com.softleaf.groupware.dto.UserDTO;
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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public ApiController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
    }

    /**
     * 로그인, 유저 토큰 발급
     * @param loginDto
     * @return
     * @throws Exception
     */
    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@RequestBody LoginDto loginDto) throws Exception {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);		// 여기서 loadUserByUsername 호출
        SecurityContextHolder.getContext().setAuthentication(authentication);		// 로그인 상태를 유지 ==> 인가

        String access_token = tokenProvider.createToken(authentication);    // access token 자주 갱신되는 토큰 값(보안상 앞단에 노출이 되기 때문에 자주 갱신이된다)
        String refresh_token = tokenProvider.createRefreshToken();          // refresh token DB에 저장되는 토큰 값(긴시간동안 세션을 유지시키게 한다.)
        String loginId = SecurityContextHolder.getContext().getAuthentication().getName(); // 암호화가 필요할 수 있다. -> 암호화 -> Spring 시큐리티
        //addTokenToCookie(response, jwt);
        HttpHeaders httpHeaders = new HttpHeaders();
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

        // logger.debug("authentication.getAuthorities() ===>" + );

        return new ResponseEntity<>(new TokenDto(access_token, refresh_token), httpHeaders, HttpStatus.OK);
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
    public ResponseEntity<UserDTO> signUp(@RequestBody /* Json으로 받음 */ UserDTO userDto) throws Exception {
        //return ResponseEntity.ok(userService.signup(userDto));

        return new ResponseEntity<>(userService.signup(userDto), HttpStatus.CREATED);
    }

    @PostMapping("/mail/dupCheck")
    public ResponseEntity<UserDTO> dupCheck(@RequestBody /* Json으로 받음 */ UserDTO userDto) throws Exception {
        //return ResponseEntity.ok(userService.signup(userDto));
        return new ResponseEntity<>(userService.signup(userDto), HttpStatus.CREATED);
    }
}
