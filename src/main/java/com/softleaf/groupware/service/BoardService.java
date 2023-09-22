package com.softleaf.groupware.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.softleaf.groupware.dto.AttachInfo;
import com.softleaf.groupware.dto.Board;


public interface BoardService {

    public List<Board> getBoardList(HashMap<String, Object> map) throws Exception;
	
	public int insertBoard(HashMap<String, Object> map) throws Exception;
	
	public int updateBoard(HashMap<String, Object> map) throws Exception;
	
	public int deleteBoard(HashMap<String, Object> map) throws Exception;
	
	public Board getBoardInfo(HashMap<String, Object> map) throws Exception;

	public int getBoardListCnt(HashMap<String, Object> map) throws Exception;
	
	public List<AttachInfo> getAttachInfoList(Map<String, Object> map) throws Exception;
	
	public AttachInfo getAttachInfo(Map<String, Object> map) throws Exception;
	
	public int deleteAttachInfo(Map<String, Object> map) throws Exception;
}
