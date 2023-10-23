package com.softleaf.groupware.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.UserDTO;

public interface UserService {

	int insertUser(UserDTO user) throws Exception;

	int updateUser(UserDTO user) throws Exception;

	List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception;
	
	UserDTO getUserInfo(UserDTO user) throws Exception;

	ArrayList<Integer> getAuthNotUserIdList(HashMap<String, Object> map) throws Exception;

	int deleteUser(HashMap<String, Object> map) throws Exception;

	int updateRefreshToken(HashMap<String, Object> map) throws Exception;

	UserDTO getUserRenew(String refreshToken);

	HashMap<String, Object> signup(UserDTO userDto) throws Exception;

	UserDTO findByLoginId(String loginId);

	int confirmAuthKay(HashMap<String, Object> map) throws Exception;

	int deleteAuthUser(HashMap<String, Object> map) throws Exception;
	int getUserCnt(HashMap<String, Object> map) throws Exception;

}
