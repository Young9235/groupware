package com.softleaf.groupware.service;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.MenuDTO;

public interface MenuService {

	public List<MenuDTO> getMenuList(HashMap<String, Object> map) throws Exception;

	int getMenuListCnt(HashMap<String, Object> map) throws Exception;

	public MenuDTO getMenuInfo(HashMap<String, Object> map) throws Exception;

	public int insertMenu(MenuDTO menu);
	
	int updateMenu(MenuDTO menu);

	int deleteMenu(HashMap<String, Object> map) throws Exception;
}
