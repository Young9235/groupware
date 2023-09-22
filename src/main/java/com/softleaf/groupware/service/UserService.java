package com.softleaf.groupware.service;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.UserDTO;

public interface UserService {

	UserDTO getLoginCheck(UserDTO user) throws Exception;

	int getUserCheck(UserDTO user) throws Exception;

	public int insertUser(HashMap<String, Object> map) throws Exception;

	int updateUser(UserDTO user);


	public List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception;
	
	public UserDTO getUserInfo(HashMap<String, Object> map) throws Exception;
//	

	int getUserListCnt(HashMap<String, Object> map) throws Exception;

	int deleteUser(HashMap<String, Object> map) throws Exception;

	int updateRefreshToken(HashMap<String, Object> map) throws Exception;

	UserDTO getUserRenew(String refreshToken);

	UserDTO signup(UserDTO userDto) throws Exception;

	UserDTO findByLoginId(String loginId);

}
