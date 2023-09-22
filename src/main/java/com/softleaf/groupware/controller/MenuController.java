package com.softleaf.groupware.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


import com.softleaf.groupware.dto.MenuDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.softleaf.groupware.service.MenuService;

/*
 * 회원 관리
 * 김경진
 */
@RestController	// requestMapping으로 설정해주지 않아도 됨
@RequestMapping("/menu")
public class MenuController {
	
	
	@Autowired
	private MenuService menuService;
	private final Logger logger = LoggerFactory.getLogger(CodeController.class);

	
	
	
    @PostMapping("/insert")
    public int insertMenu(@RequestBody MenuDTO menu) throws Exception{

    	
    	int result = 0;
    	try {
    		result = menuService.insertMenu(menu);
		} catch (Exception e) {
			System.out.println(e);
		}
    	
    	System.out.println("result >>>>>>>>>>>>>>>" + result);
    	return result; 
    }
    
    

	// 모두 가져오기
	@GetMapping("/list")	
	public ResponseEntity<JSONObject> getUserList(MenuDTO search) throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		JSONArray dataList = new JSONArray();
		JSONObject jsonResult = new JSONObject();
		int totalCount = 0;
		
		if("AUTH".equals(search.getPageMode()) && search.getPageMode() != null) {
			map.put("pageMode", search.getPageMode());
		} else {
			logger.info("search Param =====> startPage : " + search.getStartPage() 
			+ ", currentPage : " + search.getCurrentPage()
			+ ", pagingCount : " + search.getPagingCount()
			+ ", rowsPerPage : " + search.getRowsPerPage()
			+ ", schMenuType : " + search.getSchMenuType()
			+ ", schMenuName : " + search.getSchMenuName());
			
			
			
			map.put("currentPage", search.getCurrentPage());
			map.put("startNum", (search.getCurrentPage()-1)*search.getRowsPerPage());
			map.put("pagingCount", search.getPagingCount());
			map.put("rowsPerPage", search.getRowsPerPage());
			map.put("menuName", search.getSchMenuName());
			map.put("menuType", search.getSchMenuType());
			
			totalCount = menuService.getMenuListCnt(map);

			search.setTotalCount(totalCount, map);

			System.out.println("totalCount >>>>>>>>>>" + totalCount);
			System.out.println("search.getSchRowsPerPage() >>>>>>>>>>" + search.getSchRowsPerPage());
			System.out.println("search.getStartPage() >>>>>>>>>>" + search.getStartPage());
		}
		
		List<MenuDTO> menuList = menuService.getMenuList(map);
		
		for(MenuDTO menu : menuList) {			
			JSONObject obj = new JSONObject();
			obj.put("menuId", menu.getMenuId());
			obj.put("menuName", menu.getMenuName());
			obj.put("menuType", menu.getMenuType());
			obj.put("parentMenu", menu.getParentMenu());
			obj.put("parentMenuNm", menu.getParentMenuNm());
			obj.put("menuUrl", menu.getMenuUrl());
			obj.put("menuDesc", menu.getMenuDesc());
			dataList.add(obj);
		}
		
		jsonResult.put("dataList", dataList);
		jsonResult.put("startPage", search.getStartPage());
		jsonResult.put("totalCnt", totalCount);
		jsonResult.put("currentPage", search.getCurrentPage());
		jsonResult.put("endPage", search.getEndPage());
		jsonResult.put("totalPage", search.getTotalPage());
		
		
		return new ResponseEntity<>(jsonResult, HttpStatus.OK);	// user데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}
	
	
	// 메뉴 상세보기
	@GetMapping("/detail/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> getMenuInfo(@PathVariable int id) throws Exception {
		System.out.println("id" + id);
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == 0) {
			throw new Exception("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		return new ResponseEntity<>(menuService.getMenuInfo(map), HttpStatus.OK);
	}
//	
//	
	// 수정하기
	@PutMapping("/update/{id}")	
	public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody MenuDTO menu) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		
		
		if(id == 0) {
			throw new Exception("param In id not Exits ");
		} else {
			menu.setUpdateId(id);
//			map.put("idx", id);
		}
		
		return new ResponseEntity<>(menuService.updateMenu(menu), HttpStatus.OK);
	}
	
//	// 삭제하기
	@DeleteMapping("/delete")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		public ResponseEntity<?> deleteMenu(MenuDTO param) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		logger.info("delete Param =====> menuIdList : " + param.getMenuIdList());

		ArrayList<String> menuIdList = param.getMenuIdList();
		if(menuIdList.size() == 0) {
			throw new Exception("param In id not Exits ");
		} else {
			map.put("menuIdList", menuIdList);
		}
		
		return new ResponseEntity<>(menuService.deleteMenu(map), HttpStatus.OK);
	}
//	


}
