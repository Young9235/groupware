package com.softleaf.groupware.serviceImpl;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dao.MenuMapper;
import com.softleaf.groupware.dto.MenuDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softleaf.groupware.service.MenuService;


@Service
public class MenuServiceImpl implements MenuService {
	
	
	@Autowired
	private MenuMapper menuMapper;

	@Transactional
	public int insertMenu(MenuDTO menu){
		
		int result = 0;
		try {
			
    		String parentMenuNm = menu.getParentMenuNm();
    		System.out.println("parentMenuNm >>>>>>>>>>>>>>>>>" + parentMenuNm);
    		int parentMenu = menuMapper.getFindParentMenu(parentMenuNm);
    		menu.setParentMenu(parentMenu);
			
			result = menuMapper.insertMenu(menu);
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return result;
	}

	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteMenu(HashMap<String, Object> map) throws Exception {
		int suc = menuMapper.deleteMenu(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("USER 데이터베이스에 삭제되지 않았습니다.");
		return suc;
	}

	
	@Transactional
	public int updateMenu(MenuDTO menu){
		
		int result = 0;

		try {
			
    		String parentMenuNm = menu.getParentMenuNm();
    		int parentMenu = menuMapper.getFindParentMenu(parentMenuNm);
    		menu.setParentMenu(parentMenu);
			
			result = menuMapper.updateMenu(menu);
		} catch (Exception e) {
			System.out.println(e);
		}
		
		
		return result;
	}
	
	
	
	@Transactional(readOnly = true)
	public int getMenuListCnt(HashMap<String, Object> map) throws Exception {
		return menuMapper.getMenuListCnt(map);
	}
//	
	// 메뉴 리스트
	@Transactional(readOnly = true)		
	public List<MenuDTO> getMenuList(HashMap<String, Object> map) throws Exception {
		return menuMapper.getMenuList(map);
	}
	
	// 메뉴 상세보기
	@Transactional(readOnly = true)
	public MenuDTO getMenuInfo(HashMap<String, Object> map) throws Exception {
		MenuDTO menu = menuMapper.getMenuInfo(map);
		return menu;
	}


}
	

