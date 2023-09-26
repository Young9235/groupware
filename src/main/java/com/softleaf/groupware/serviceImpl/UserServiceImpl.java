package com.softleaf.groupware.serviceImpl;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dao.UserAuthMapper;
import com.softleaf.groupware.dao.UserMapper;
import com.softleaf.groupware.dto.UserDTO;
import com.softleaf.groupware.exception.DuplicateMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softleaf.groupware.service.UserService;


@Service
public class UserServiceImpl implements UserService {
//
	private final UserMapper userMapper;

	private final UserAuthMapper userAuthMapper;

	//	private final SeqMapper seqMapper;
	
//	final String authStr = "AUTH_ID";

	public UserServiceImpl(UserMapper userMapper, UserAuthMapper userAuthMapper) {
		this.userMapper = userMapper;
		this.userAuthMapper = userAuthMapper;
	}

	@Transactional
	public UserDTO signup(UserDTO userDto) throws Exception {
		// 저장
		// 조회
		UserDTO userVo = null;
		HashMap<String, Object> map = new HashMap<>();
		userVo = this.findByLoginId(userDto.getLoginId());
		if (userVo != null) {
			throw new DuplicateMemberException("중복된 아이디 입니다.");
		}

		map.put("username", userDto.getLoginId());
		map.put("password", userDto.getPassword());

		this.insertUser(map);
		userVo = this.findByLoginId(userDto.getLoginId());

//		String seq = seqMapper.getSequenceInfo(authStr);
//		seqMapper.updateSequenceInfo(authStr);

		map.put("user_id", userVo.getUserId());
		map.put("auth_name", "USER");

		int suc = userAuthMapper.insertAuth(map);
		if (suc <= 0) {
			throw new Exception("error : 권한 정보가 저장 되지 않았습니다.");
		}

		return this.findByLoginId(userVo.getLoginId());
	}

	@Transactional(readOnly = true)
	public UserDTO findByLoginId(String loginId) {
		return userMapper.findByLoginId(loginId);
	}

	@Transactional(readOnly = true)		
	public UserDTO getLoginCheck(UserDTO user) throws Exception {
		
		System.out.println("userMapper.getUserCheck(user);" + userMapper.getUserCheck(user));
		
		return userMapper.getLoginCheck(user);
	}
	
	@Transactional(readOnly = true)		
	public int getUserCheck(UserDTO user) throws Exception {
		
		System.out.println("userMapper.getUserCheck(user);" + userMapper.getUserCheck(user));
		
		return userMapper.getUserCheck(user);
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
	public void insertUser(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.insertUser(map);
		if(suc <= 0)
			throw new IllegalArgumentException("USER 데이터베이스에 저장되지 않았습니다.");
	}
	
	@Transactional
	public int updateUser(UserDTO user){
		return userMapper.updateUser(user);
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

	@Transactional(readOnly = true)
	public int getUserListCnt(HashMap<String, Object> map) throws Exception {
		return userMapper.getUserListCnt(map);
	}
	
	// 유저 리스트
	@Transactional(readOnly = true)		
	public List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception {
		return userMapper.getUserList(map);
	}
	
	@Transactional(readOnly = true)
	public UserDTO getUserInfo(HashMap<String, Object> map) throws Exception {
		UserDTO user = userMapper.getUserInfo(map);
//		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
				
		return user;
	}
}
	

