package com.softleaf.groupware.dao;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Code;
import org.apache.ibatis.annotations.Mapper;


@Mapper	// @Repository안에 존재 포함하고 있음, 작은단위 @MapperScan 필히 사용해야함 -> 어느것을 사용해도 상관없..지만 부트에서는 Mapper을 주로 쓰는듯보인다...
public interface CodeMapper {
	List<Code> getCodeList(HashMap<String, Object> map) throws Exception;
	
	int deleteCode(HashMap<String, Object> map) throws Exception;
	
	int updateCode(HashMap<String, Object> map) throws Exception;
	
	int insertCode(HashMap<String, Object> map) throws Exception;
	
	Code getCodeInfo(HashMap<String, Object> map) throws Exception;

	int getCodeListCnt(HashMap<String, Object> map) throws Exception;
	
	int getCodeDupChk(HashMap<String, Object> map) throws Exception;
	
	int getCodeDelCheck(HashMap<String, Object> map) throws Exception;
}
