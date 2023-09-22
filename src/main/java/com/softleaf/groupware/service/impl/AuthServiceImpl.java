package com.softleaf.groupware.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dao.AuthMapper;
import com.softleaf.groupware.dto.Auth;
import com.softleaf.groupware.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AuthServiceImpl implements AuthService {
	
	private final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
	
	private final AuthMapper authMapper;
	
	public AuthServiceImpl(AuthMapper authMapper) {
		this.authMapper = authMapper;
	}
	
	@Transactional(readOnly = true)	
	public int getAuthListCnt(HashMap<String, Object> map) throws Exception {
		return authMapper.getAuthListCnt(map);
	}
	
	@Transactional(readOnly = true)		
	public List<Auth> getAuthList(HashMap<String, Object> map) throws Exception {
		return authMapper.getAuthList(map);
	}
	
	@Transactional(readOnly = true)
	public Auth getAuthInfo(HashMap<String, Object> map) throws Exception {
		
		Auth authInfo = authMapper.getAuthInfo(map);
		if(authInfo == null) {
			throw new IllegalArgumentException("select authInfo Fail ====> 잘못된 경로 입니다.");
		} else {
			ArrayList<Integer> menuAuthMapping = authMapper.getMenuAuthMapping(map);
			if(menuAuthMapping.size() > 0) {
				authInfo.setMenuIdList(menuAuthMapping);
			}
		}
		
		return authInfo;
	}
	
	@Transactional
	public int insertAuth(Auth auth) throws Exception {
		int suc = authMapper.insertAuth(auth);
		
		logger.info("insert Data >>>> " + auth.getLastIdx());	// auto_increment를 가져와야 하기 때문에 DTO로 넘긴다.
		
		if(suc <= 0 && auth.getLastIdx() <= 0) 
			throw new IllegalArgumentException("insertAuth : 데이터베이스에 저장되지 않았습니다.");
		else {
			auth.setAuthId(auth.getLastIdx());
			this.insertMenuAuthMapping(auth);
		}
		
		return suc;
	}
	
	@Transactional
	public int updateAuth(Auth auth) throws Exception {
		int suc = authMapper.updateAuth(auth);
		
		logger.info("update Data >>>> " + auth.getAuthId());
		
		if(suc <= 0) 
			throw new IllegalArgumentException("updateAuth : 데이터베이스에 업데이트 되지 않았습니다.");
		else {
			this.insertMenuAuthMapping(auth);
		}
		
		return suc;
	}
	
	@Transactional
	public int insertMenuAuthMapping(Auth auth) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		int suc = 1;
		
		map.put("authId", auth.getAuthId());
		map.put("userId", auth.getUserId());
		authMapper.deleteMenuAuthMapping(map);
		
		ArrayList<Integer> menuIdList = auth.getMenuIdList();
		if(menuIdList.size() > 0) {
			suc = 0;
			for(int menuId : auth.getMenuIdList()) {
				map.put("menuId", menuId);
				suc = authMapper.insertMenuAuthMapping(map);
				if(suc == 0) break;
			}
			
			if(suc <= 0) 
				throw new IllegalArgumentException("insertMenuAuthMapping : 데이터베이스에 저장되지 않았습니다.");
		}
		
		return suc;
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteAuth(HashMap<String, Object> map) throws Exception {
		int suc = authMapper.deleteAuth(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
}
