package com.softleaf.groupware.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Auth;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

/**
 * 권한 관리
 */
@RestController	
@RequestMapping("/admin/auth")
public class AuthController {
	
	private final AuthService authService;
	private final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@GetMapping("/length")
	public ResponseEntity<JSONObject> getAuthListCnt() throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		int totalCount = authService.getAuthListCnt(map);
		map.put("totalCnt", totalCount);
		return new ResponseEntity<>(new JSONObject(map), HttpStatus.OK);
	}

	// 모두 가져오기
	@GetMapping("/list")	
	public ResponseEntity<JSONObject> getAuthList(Auth search) throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		JSONArray dataList = new JSONArray();
		JSONObject jsonResult = new JSONObject();
		
		
		if("USER".equals(search.getPageMode()) && search.getPageMode() != null) {
			map.put("pageMode", search.getPageMode());
		} else {
		
			logger.info("search Param =====> startPage : " + search.getStartPage() 
						+ ", currentPage : " + search.getCurrentPage()
						+ ", pagingCount : " + search.getPagingCount()
						+ ", rowsPerPage : " + search.getRowsPerPage()
						+ ", schAuthName : " + search.getSchInputBox());
			
			map.put("currentPage", search.getCurrentPage());
			map.put("startNum", (search.getCurrentPage()-1)*search.getRowsPerPage());
			map.put("pagingCount", search.getPagingCount());
			map.put("rowsPerPage", search.getRowsPerPage());
			map.put("authName", search.getSchInputBox());
			
			int totalCount = authService.getAuthListCnt(map);
			
			search.setTotalCount(totalCount, map);
		
		}
		
		List<Auth> authList = authService.getAuthList(map);
		
		for(Auth auth : authList) {			
			JSONObject obj = new JSONObject();
			obj.put("authId", auth.getAuthId());
			obj.put("authName", auth.getAuthName());
			obj.put("authDesc", auth.getAuthDesc());
			obj.put("createUserNm", auth.getUserName());
			obj.put("createId", auth.getCreateId());
			obj.put("createDate", auth.getCreateDate());
			dataList.add(obj);
		}
		
		jsonResult.put("dataList", dataList);
		jsonResult.put("startPage", search.getStartPage());
		// jsonResult.put("currentPage", search.getCurrentPage());
		jsonResult.put("endPage", search.getEndPage());
		jsonResult.put("totalPage", search.getTotalPage());
		
		// System.out.println("jsonResult ===> " + jsonResult.toJSONString());
		
		return new ResponseEntity<>(jsonResult, HttpStatus.OK);	// Auth데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}
	
	// 저장하기
	@PostMapping("/insert")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<JSONObject> insertAuth(@RequestBody /* Json으로 받음 */ Auth auth) throws Exception {
		
		HashMap<String, Object> map = new HashMap<>();
		
		if(auth.getAuthName() == null || "".equals(auth.getAuthName())) {
			throw new Exception("param in authName not exits.");
		}
		
		auth.setUseStatus("Y");
		auth.setDeleteStatus("N");

		int resCnt = authService.insertAuth(auth);
		// map.clear();
		map.put("result", resCnt);
		map.put("authId", auth.getAuthId());
		
		return new ResponseEntity<>(new JSONObject(map), HttpStatus.CREATED);
	}
	
	// 한건 가져오기
	@GetMapping("/detail/{auth-id}")
	public ResponseEntity<Auth> getAuthInfo(@PathVariable("auth-id") String authId) throws Exception {
		logger.info("authId ========>>>>>> " + authId);
		
		HashMap<String, Object> map = new HashMap<>();
		
		if(authId == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("authId", authId);
		}
		
		return new ResponseEntity<>(authService.getAuthInfo(map), HttpStatus.OK);
	}
	
	// 수정하기
	@PutMapping("/update/{auth-id}")	
	public ResponseEntity<?> updateAuth(@PathVariable("auth-id") String authId, @RequestBody Auth auth) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(authId == null) {
			throw new IllegalArgumentException("param In authId not Exits ");
		} 
		
		if(auth.getAuthName() == null || "".equals(auth.getAuthName())) {
			throw new Exception("param in authName not exits.");
		} 
		
		auth.setDeleteStatus("N");
		
		int resCnt = authService.updateAuth(auth);
		map.put("result", resCnt);
		if(resCnt > 0)	map.put("authId", authId);
		
		return new ResponseEntity<>(new JSONObject(map), HttpStatus.OK);
	}
	
	// 삭제하기
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteAuth(Auth param) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		logger.info("delete Param =====> authIdList : " + param.getAuthIdList());
		
		ArrayList<String> authIdList = param.getAuthIdList();
		
		if(authIdList.size() <= 0) {
			throw new IllegalArgumentException("param In authIdList not Exits ");
		} else {
			map.put("authIdList", authIdList);
		}

		return new ResponseEntity<>(authService.deleteAuth(map), HttpStatus.OK);
	}
}
