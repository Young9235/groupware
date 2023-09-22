package com.softleaf.groupware.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.softleaf.groupware.dao.AttachInfoMapper;
import com.softleaf.groupware.dao.BoardMapper;
import com.softleaf.groupware.dto.AttachInfo;
import com.softleaf.groupware.dto.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softleaf.groupware.service.BoardService;

@Service
public class BoardServiceimpl implements BoardService{
    private final BoardMapper boardMapper;
    
	@Autowired
	private AttachInfoMapper attachInfoMapper;
    
    public BoardServiceimpl(BoardMapper boardMapper) {
		this.boardMapper = boardMapper;
	}
	@Transactional(readOnly = true)	
	public int getBoardListCnt(HashMap<String, Object> map) throws Exception {
		return boardMapper.getBoardListCnt(map);
	}
	
	@Transactional(readOnly = true)		
	public List<Board> getBoardList(HashMap<String, Object> map) throws Exception {
		return boardMapper.getBoardList(map);
	}
	
	@Transactional
	public int deleteAttachInfo(Map<String, Object> map) throws Exception{
		return attachInfoMapper.deleteAttachInfo(map);
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteBoard(HashMap<String, Object> map) throws Exception {
		int suc = boardMapper.deleteBoard(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public Board getBoardInfo(HashMap<String, Object> map) throws Exception {
		return boardMapper.getBoardInfo(map);
	}
	
	@Transactional
	public int insertBoard(HashMap<String, Object> map) throws Exception {
		
		int suc = boardMapper.insertBoard(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public int updateBoard(HashMap<String, Object> map) throws Exception {
		int suc = boardMapper.updateBoard(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public List<AttachInfo> getAttachInfoList(Map<String, Object> map) throws Exception{
		return attachInfoMapper.getAttachInfoList(map);
	}
	
	public AttachInfo getAttachInfo(Map<String, Object> map) throws Exception{
		return attachInfoMapper.getAttachInfo(map);
	}
	
}
