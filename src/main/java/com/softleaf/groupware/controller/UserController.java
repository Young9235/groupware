package com.softleaf.groupware.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


import com.softleaf.groupware.dto.UserDTO;
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

import com.softleaf.groupware.service.AuthService;
import com.softleaf.groupware.service.UserService;

/*
 * 회원 관리
 * 김경진
 */
@RestController	// requestMapping으로 설정해주지 않아도 됨
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	private final AuthService authService;

	private final Logger logger = LoggerFactory.getLogger(CodeController.class);

	public UserController(UserService userService, AuthService authService) {
		this.userService = userService;
		this.authService = authService;
	}

	// 로그인 중복체크
	@GetMapping("/check")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> getUserCheck(UserDTO user) throws Exception {
		System.out.println("user >>>>" + user.getLoginId());
		
		HashMap<String, Object> map = new HashMap<>();
		
		if(user.getLoginId() == null) {
			throw new Exception("loginId In id not Exits ");
		}
		
		int result = 0;
		
		if(user.getLoginId() == null || user.getLoginId() == "" || user.getLoginId().equals("")) result = 2;
		else if (userService.getUserCheck(user) == 0) result = 0;
		else if(userService.getUserCheck(user) == 1) result = 1;
		
		
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
	
	
//    @PostMapping("/insert")
//    public int insertUser(@RequestBody UserDTO user) throws Exception{
//
//    	// 이메일 중복 확인
//    	int check = userService.getUserCheck(user);
//
//    	int result = 0;
//    	try {
//    		if (check < 1) {
//    			result = userService.insertUser(user);
//    		}else {
//    			throw new Exception ("******************* User duplicate error *******************");
//    		}
//
//		} catch (Exception e) {
//			System.out.println(e);
//		}
//
//
//    	System.out.println("result >>>>>>>>>>>>>>>" + result);
//    	return result;
//    }
    
    
//	// 수정하기
//	@PostMapping("/update")	
//	public int updateUser(@RequestBody HashMap<String, Object> requestJsonHashMap) throws Exception {
//		
//    	System.out.println("requestJsonHashMap" +requestJsonHashMap);
//    	
//    	UserDTO user = new UserDTO();
//    	user.setUserId((int) requestJsonHashMap.get("idx"));
//    	user.setUserPassword((String) requestJsonHashMap.get("password"));
//    	user.setUserName((String) requestJsonHashMap.get("username"));
//    	
////    	int check = userService.getUserCheck(user);
////    	System.out.println("loginCheck>>>>>>>>>>>>" + check);
//    	
//    	int result = 0;
//    	try {
//    		result = userService.updateUser(user);
//    		
//		if (result < 1) {
//			throw new Exception ("***************** Update error *********************");
//		}
//			
//		} catch (Exception e) {
//			System.out.println(e);
//		}
//		return result;
//	}
	
	

	// 모두 가져오기
	@GetMapping("/list")	
	public ResponseEntity<JSONObject> getUserList(UserDTO search) throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		JSONArray dataList = new JSONArray();
		JSONObject jsonResult = new JSONObject();
		int totalCount = 0;
		
		logger.info("search Param =====> startPage : " + search.getStartPage() 
		+ ", currentPage : " + search.getCurrentPage()
		+ ", pagingCount : " + search.getPagingCount()
		+ ", rowsPerPage : " + search.getRowsPerPage()
		+ ", schCodeName : " + search.getSchUserName());
		
		// TODO 아래 코드 중복됨 알수없는 누군가
		map.put("currentPage", search.getCurrentPage());
		map.put("startNum", (search.getCurrentPage()-1)*search.getRowsPerPage());
		map.put("pagingCount", search.getPagingCount());
		map.put("rowsPerPage", search.getRowsPerPage());
		map.put("userName", search.getSchUserName());
		
		totalCount = userService.getUserListCnt(map);
		
		search.setTotalCount(totalCount, map);
		
		List<UserDTO> userList = userService.getUserList(map);
		
		for(UserDTO user : userList) {			
			JSONObject obj = new JSONObject();
			obj.put("userId", user.getUserId());
			obj.put("loginId", user.getLoginId());
			obj.put("userName", user.getUserName());
			obj.put("userPhoneNum", user.getPhoneNum());
			obj.put("createDate", user.getCreateDate());
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
	
	
	
	// 한건 가져오기
	@GetMapping("/detail/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> getUserInfo(@PathVariable int id) throws Exception {
		System.out.println("id" + id);
		UserDTO userDTO = new UserDTO();
		if(id == 0) {
			throw new Exception("param In id not Exits ");
		} else {
			userDTO.setUserId(id);
		}
		
		return new ResponseEntity<>(userService.getUserInfo(userDTO), HttpStatus.OK);
	}
	
	
	// 수정하기
	@PutMapping("/update/{id}")	
	public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDTO user) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		
		System.out.println("user >>>>" + user.getPassword());
		
		if(id == 0) {
			throw new Exception("param In id not Exits ");
		} else {
			user.setUserId(id);
			user.setUpdateId(id);
//			map.put("idx", id);
		}
		
		return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
	}
	
//	// 삭제하기
	@DeleteMapping("/delete")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
//	public ResponseEntity<?> deleteUser(@PathVariable int id) throws Exception {
		public ResponseEntity<?> deleteUser(UserDTO param) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		logger.info("delete Param =====> userIdList : " + param.getUserIdList());

		ArrayList<String> userIdList = param.getUserIdList();
		if(userIdList.size() == 0) {
			throw new Exception("param In id not Exits ");
		} else {
			map.put("userIdList", userIdList);
		}
		
		return new ResponseEntity<>(userService.deleteUser(map), HttpStatus.OK);
	}
//	


}
