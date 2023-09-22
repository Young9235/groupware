package com.softleaf.groupware.service;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Auth;


public interface AuthService {

	public List<Auth> getAuthList(HashMap<String, Object> map) throws Exception;
	
	public int insertAuth(Auth auth) throws Exception;
	
	public int updateAuth(Auth auth) throws Exception;
	
	public int deleteAuth(HashMap<String, Object> map) throws Exception;
	
	public Auth getAuthInfo(HashMap<String, Object> map) throws Exception;

	public int getAuthListCnt(HashMap<String, Object> map) throws Exception;
	
}
