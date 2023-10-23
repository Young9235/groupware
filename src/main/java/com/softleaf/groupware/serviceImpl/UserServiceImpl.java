package com.softleaf.groupware.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dao.UserAuthMapper;
import com.softleaf.groupware.dao.UserMapper;
import com.softleaf.groupware.dto.UserDTO;
import com.softleaf.groupware.exception.DuplicateMemberException;
import com.softleaf.groupware.service.MailService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softleaf.groupware.service.UserService;


@Service
public class UserServiceImpl implements UserService {
//
	private final UserMapper userMapper;
	private final MailService mailService;
	private final UserAuthMapper userAuthMapper;

	//	private final SeqMapper seqMapper;
	
//	final String authStr = "AUTH_ID";

	public UserServiceImpl(UserMapper userMapper, MailService mailService, UserAuthMapper userAuthMapper) {
		this.userMapper = userMapper;
		this.mailService = mailService;
		this.userAuthMapper = userAuthMapper;
	}

	@Transactional
	public HashMap<String, Object> signup(UserDTO userDto) {
		HashMap<String, Object> resultMap = new HashMap<>();	// TODO: 이거 map이 아닌, response data 공통으로 만들어야 할듯..?
		resultMap.put("status", "fail");

		try {
			HashMap<String, Object> map = new HashMap<>();
			map.put("loginId", userDto.getLoginId());
			map.put("approvYn", "Y");
			int getLoginCheck = userMapper.getLoginCheck(map);

			if (getLoginCheck > 0) {
				throw new DuplicateMemberException("가입이 이미 완료 된 이메일입니다.");
			}

			UserDTO userVo = this.getUserInfo(userDto);	// 인증한 유저와 인증 안한 유저 모두 조회
			if (userVo == null) {	// 맨 처음 가입하는 유저 등록
				map.clear();
				userDto.setApprovYn("N");
				this.insertUser(userDto);

//				map.put("userId", userDto.getUserId());
//				map.put("authName", "ROLE_USER");
//
//				int suc = userAuthMapper.insertAuth(map);
//				if (suc <= 0) {
//					throw new Exception("error : 권한 정보가 저장 되지 않았습니다.");
//				}
			} else {
				userDto.setUserId(userVo.getUserId());
				this.updateUser(userDto);
			}
			// 이쪽에서 메일(인증 코드)를 보내자! -> 저장은 메일 인증을 한 후 저장하는걸로?, 이쪽에서 key값 업데이트 처리
			mailService.sendEmail(userDto.getLoginId());

			resultMap.put("status", "success");
			resultMap.put("loginId", userDto.getLoginId());

		} catch (Exception e) {
			resultMap.put("status", "fail");
			throw new RuntimeException(e);
		}

		return resultMap;
	}

	@Transactional(readOnly = true)
	public UserDTO findByLoginId(String loginId) {
		return userMapper.findByLoginId(loginId);
	}

	@Transactional
	public int confirmAuthKay(HashMap<String, Object> map) throws Exception {
		int suc = userAuthMapper.insertAuth(map);
		if (suc <= 0) {
			throw new Exception("error : 권한 정보가 저장 되지 않았습니다.");
		}

		suc = userMapper.deleteAuthKay(map);
		if (suc <= 0) {
			throw new Exception("error : 유저정보 삭제 처리가 되지 않았습니다.");
		}

		return suc;
	}


//	@Transactional
//	public int insertUser(UserDTO user) {
//		int result = 0;
//		try {
//			result = userMapper.insertUser(user);
//
//			// 권한 매핑
//			userAuthMapper.insertAuthMapping(user);
//
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
//
//		return result;
//	}


	@Transactional
	public int insertUser(UserDTO userDTO) throws Exception {
		int suc = userMapper.insertUser(userDTO);
		if(suc <= 0)
			throw new IllegalArgumentException("USER 데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public int updateUser(UserDTO user) throws Exception {
		int suc = userMapper.updateUser(user);
		if(suc <= 0)
			throw new IllegalArgumentException("USER 데이터베이스에 업데이트되지 않았습니다.");
		return suc;
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteUser(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.deleteUser(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("USER 데이터베이스에 삭제되지 않았습니다.");
		return suc;
	}

	@Override
	public int updateRefreshToken(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.updateRefreshToken(map);
		if(suc <= 0)
			throw new IllegalArgumentException("USER 데이터베이스에 저장되지 않았습니다.");
		return suc;
	}

	@Transactional(readOnly = true)
	public UserDTO getUserRenew(String refreshToken) {
		return userMapper.getUserRenew(refreshToken);
	}

	/**
	 * 1시간 지날때까지 인증 안한 회원 조회
	 * @param map -
	 * @return ArrayList
	 * @throws Exception -
	 */
	@Transactional(readOnly = true)
	public ArrayList<Integer> getAuthNotUserIdList(HashMap<String, Object> map) throws Exception {
		return userMapper.getAuthNotUserIdList(map);
	}
	
	// 유저 리스트
	@Transactional(readOnly = true)		
	public List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception {
		return userMapper.getUserList(map);
	}
	
	@Transactional(readOnly = true)
	public UserDTO getUserInfo(UserDTO userDTO) throws Exception {
//		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		return userMapper.getUserInfo(userDTO);
	}

	/**
	 * 인증 안한 회원 삭제
	 * @param map -
	 * @return Integer
	 * @throws Exception -
	 */
	@Transactional
	public int deleteAuthUser(HashMap<String, Object> map) throws Exception {
		return userMapper.deleteAuthUser(map);
	}

	@Transactional(readOnly = true)
	public int getUserCnt(HashMap<String, Object> map) throws Exception {
		return userMapper.getUserCnt(map);
	}
}
	

