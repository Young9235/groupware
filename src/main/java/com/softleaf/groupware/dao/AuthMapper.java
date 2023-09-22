package com.softleaf.groupware.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Auth;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface AuthMapper {
	int getAuthListCnt(HashMap<String, Object> map) throws Exception;
	
	List<Auth> getAuthList(HashMap<String, Object> map) throws Exception;
	
	Auth getAuthInfo(HashMap<String, Object> map) throws Exception;
	
	int insertAuth(Auth auth) throws Exception;
	
	int updateAuth(Auth auth) throws Exception;
	
	int deleteAuth(HashMap<String, Object> map) throws Exception;
	
	ArrayList<Integer> getMenuAuthMapping(HashMap<String, Object> map) throws Exception;
	
	int insertMenuAuthMapping(HashMap<String, Object> map) throws Exception;
	
	int deleteMenuAuthMapping(HashMap<String, Object> map) throws Exception;
}
