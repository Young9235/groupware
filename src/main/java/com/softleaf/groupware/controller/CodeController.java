package com.softleaf.groupware.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Code;
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

import com.softleaf.groupware.service.CodeService;

/**
 * 코드 관리
 * 서버, CRUD 테스트 완료
 *
 */
@RestController	
@RequestMapping("/code")
public class CodeController {
	
	private final CodeService codeService;
	private final Logger logger = LoggerFactory.getLogger(CodeController.class);
	
	public CodeController(CodeService codeService) {
		this.codeService = codeService;
	}
	
	// security 라이브러리(CORS정책) => 필터를 만들어야함 => 시큐리티가 CORS를 해제해줘야함
	// 모두 가져오기
	@GetMapping("/listLength")	
	public ResponseEntity<Integer> getCodeListCnt() throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		int totalCount = codeService.getCodeListCnt(map);
		return new ResponseEntity<>(totalCount, HttpStatus.OK);	// Code데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}
		
	// 모두 가져오기
	@GetMapping("/list")	
	public ResponseEntity<JSONObject> getCodeList(Code search) throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		JSONArray dataList = new JSONArray();
		JSONObject jsonResult = new JSONObject();
		
		logger.info("search Param =====> startPage : " + search.getStartPage() 
					+ ", currentPage : " + search.getCurrentPage()
					+ ", pagingCount : " + search.getPagingCount()
					+ ", rowsPerPage : " + search.getRowsPerPage()
					+ ", schCodeName : " + search.getSchInputBox());
		
		map.put("currentPage", search.getCurrentPage());
		map.put("startNum", (search.getCurrentPage()-1)*search.getRowsPerPage());
		map.put("pagingCount", search.getPagingCount());
		map.put("rowsPerPage", search.getRowsPerPage());
		map.put("codeName", search.getSchInputBox());
		
		int totalCount = codeService.getCodeListCnt(map);
		
		search.setTotalCount(totalCount, map);
		
		List<Code> codeList = codeService.getCodeList(map);
		
		for(Code code : codeList) {			
			JSONObject obj = new JSONObject();
			obj.put("codeId", code.getCodeId());
			obj.put("parentCodeId", code.getParentCodeId());
			obj.put("codeName", code.getCodeName());
			obj.put("codeValue", code.getCodeValue());
			obj.put("description", code.getDescription());
			obj.put("createUserNm", code.getUserName());
			obj.put("createId", code.getCreateId());
			obj.put("createDate", code.getCreateDate());
			dataList.add(obj);
		}
		
		jsonResult.put("dataList", dataList);
		jsonResult.put("startPage", search.getStartPage());
		jsonResult.put("currentPage", search.getCurrentPage());
		jsonResult.put("endPage", search.getEndPage());
		jsonResult.put("totalPage", search.getTotalPage());
		
		// System.out.println("jsonResult ===> " + jsonResult.toJSONString());
		
		return new ResponseEntity<>(jsonResult, HttpStatus.OK);	// Code데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}
	
	// 저장하기
	@PostMapping("/insert")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<JSONObject> insertCode(@RequestBody /* Json으로 받음 */ Code code) throws Exception {
		
		HashMap<String, Object> map = new HashMap<>();
		
		if(code.getCodeId() != null && !"".equals(code.getCodeId())) {
			map.put("codeId", code.getCodeId());
		} else {
			throw new Exception("param in codeId not exits.");
		}
		
		if(code.getCodeName() != null && !"".equals(code.getCodeName())) {
			map.put("codeName", code.getCodeName());
		} else {
			throw new Exception("param in codeName not exits.");
		}
		
		map.put("description", code.getDescription());
		map.put("parentCodeId", code.getParentCodeId());
		map.put("codeValue", code.getCodeValue());
		map.put("useStatus", "Y");
		map.put("userId", 0);
		
		// FileUtil.fileUpload(code.getFileData(), Constants.DOWN_LOAD_PATH, Constants.BOOK_SUB_FOLDER);

		int resCnt = codeService.insertCode(map);
		map.clear();
		map.put("result", resCnt);
		map.put("codeId", code.getCodeId());
		
		return new ResponseEntity<>(new JSONObject(map), HttpStatus.CREATED);
	}
	
	// 한건 가져오기
	@GetMapping("/detail/{code-id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<Code> getCodeInfo(@PathVariable("code-id") String codeId) throws Exception {
		logger.info("codeId ========>>>>>> " + codeId);
		
		HashMap<String, Object> map = new HashMap<>();
		
		if(codeId == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("codeId", codeId);
		}
		
		return new ResponseEntity<>(codeService.getCodeInfo(map), HttpStatus.OK);
	}
	
	// 수정하기
	@PutMapping("/update/{code-id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> updateCode(@PathVariable("code-id") String codeId, @RequestBody Code code) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(codeId == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("codeId", codeId);
		}
		
		if(code.getCodeName() != null && !"".equals(code.getCodeName())) {
			map.put("codeName", code.getCodeName());
		} else {
			throw new Exception("param in codeName not exits.");
		}
		
		map.put("description", code.getDescription());
		map.put("parentCodeId", code.getParentCodeId());
		map.put("codeValue", code.getCodeValue());
		map.put("useStatus", code.getUseStatus());
		map.put("userId", 0);
		
		int resCnt = codeService.updateCode(map);
		map.clear();
		map.put("result", resCnt);
		if(resCnt > 0)	map.put("codeId", codeId);
		
		return new ResponseEntity<>(new JSONObject(map), HttpStatus.OK);
	}
	
	// 삭제하기
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteCode(Code param) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		logger.info("delete Param =====> codeIdList : " + param.getCodeIdList());
		
		ArrayList<String> codeIdList = param.getCodeIdList();
		int resCnt = 0;
		if(codeIdList.size() <= 0) {
			throw new IllegalArgumentException("param In codeIdList not Exits ");
		} else {
			map.put("codeIdList", codeIdList);
		}
		
		map.put("delCheck", "Y");
		
		int delCheck = codeService.getCodeDelCheck(map);
		if(delCheck > 0) {	// 중복되는 값 체크
			resCnt = -1;
		} else {
			resCnt = codeService.deleteCode(map);
		}

		return new ResponseEntity<>(resCnt, HttpStatus.OK);
	}
}
