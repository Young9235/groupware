package com.softleaf.groupware.dao;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.MenuDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper	// @Repository안에 존재 포함하고 있음, 작은단위 @MapperScan 필히 사용해야함 -> 어느것을 사용해도 상관없..지만 부트에서는 Mapper을 주로 쓰는듯보인다...
public interface MenuMapper {

	
	int getMenuListCnt(HashMap<String, Object> map) throws Exception;
	
	List<MenuDTO> getMenuList(HashMap<String, Object> map) throws Exception;
	
	// 등록
	int insertMenu(MenuDTO user) throws Exception;
	
	// 수정
	int updateMenu(MenuDTO user);
	
	// 삭제
	int deleteMenu(HashMap<String, Object> map);
	
	// 상세
	MenuDTO getMenuInfo(HashMap<String, Object> map) throws Exception;

	int getFindParentMenu(String parentMenuNm);


}
