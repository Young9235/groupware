package com.softleaf.groupware.service;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Code;


public interface CodeService {

	public List<Code> getCodeList(HashMap<String, Object> map) throws Exception;
	
	public int insertCode(HashMap<String, Object> map) throws Exception;
	
	public int updateCode(HashMap<String, Object> map) throws Exception;
	
	public int deleteCode(HashMap<String, Object> map) throws Exception;
	
	public Code getCodeInfo(HashMap<String, Object> map) throws Exception;

	public int getCodeListCnt(HashMap<String, Object> map) throws Exception;
	
	public int getCodeDelCheck(HashMap<String, Object> map) throws Exception;
	
}
