package com.softleaf.groupware.service;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.UserDTO;

public interface UserService {

	int getUserCheck(UserDTO user) throws Exception;

	void insertUser(UserDTO user) throws Exception;

	int updateUser(UserDTO user);

	List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception;
	
	UserDTO getUserInfo(UserDTO user) throws Exception;
//	

	int getUserListCnt(HashMap<String, Object> map) throws Exception;

	int deleteUser(HashMap<String, Object> map) throws Exception;

	int updateRefreshToken(HashMap<String, Object> map) throws Exception;

	UserDTO getUserRenew(String refreshToken);

	UserDTO signup(UserDTO userDto) throws Exception;

	UserDTO findByLoginId(String loginId);

}
