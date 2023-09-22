package com.softleaf.groupware.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.softleaf.groupware.dto.Board;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    
    List<Board> getBoardList(HashMap<String, Object> map) throws Exception;
	
	int deleteBoard(HashMap<String, Object> map) throws Exception;
	
	int updateBoard(HashMap<String, Object> map) throws Exception;
	
	int insertBoard(HashMap<String, Object> map) throws Exception;
	
	Board getBoardInfo(HashMap<String, Object> map) throws Exception;
	
	int getBoardInfoCnt(Map<String, Object> map) throws Exception;
	
	int getBoardListCnt(Map<String, Object> map) throws Exception;
	
}
