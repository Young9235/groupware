package com.softleaf.groupware.service.impl;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dao.CodeMapper;
import com.softleaf.groupware.dto.Code;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softleaf.groupware.service.CodeService;


@Service
public class CodeServiceImpl implements CodeService {
	
	private final CodeMapper codeMapper;
	
	public CodeServiceImpl(CodeMapper codeMapper) {
		this.codeMapper = codeMapper;
	}
	
	@Transactional(readOnly = true)	
	public int getCodeListCnt(HashMap<String, Object> map) throws Exception {
		return codeMapper.getCodeListCnt(map);
	}
	
	@Transactional(readOnly = true)		
	public List<Code> getCodeList(HashMap<String, Object> map) throws Exception {
		return codeMapper.getCodeList(map);
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteCode(HashMap<String, Object> map) throws Exception {
		int suc = codeMapper.deleteCode(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public Code getCodeInfo(HashMap<String, Object> map) throws Exception {
		return codeMapper.getCodeInfo(map);
	}
	
	@Transactional
	public int insertCode(HashMap<String, Object> map) throws Exception {
		int suc = 0;
		int dupChk = codeMapper.getCodeDupChk(map);	// 1일 경우 중복O -> 0일경우 중복X
		
		if(dupChk > 0) {
			suc = -1;	// 중복 된 값
		} else {
			suc = codeMapper.insertCode(map);
			if(suc <= 0) 
				throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		}
		
		return suc;
	}
	
	@Transactional
	public int updateCode(HashMap<String, Object> map) throws Exception {
		int suc = codeMapper.updateCode(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public int getCodeDelCheck(HashMap<String, Object> map) throws Exception {
		return codeMapper.getCodeDelCheck(map);
	}
	
//	@Override
//	public List<Code> insertCode() throws Exception {
//		if(boardMapper.save(boardDto) == 0){
//			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
//	   	}
//		
//		return codeMapper.getCodeList();
//	}
	
}
