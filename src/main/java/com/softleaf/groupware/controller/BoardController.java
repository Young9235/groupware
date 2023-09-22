package com.softleaf.groupware.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.softleaf.groupware.common.Constants;
import com.softleaf.groupware.dao.AttachInfoMapper;
import com.softleaf.groupware.dao.SeqMapper;
import com.softleaf.groupware.dto.AttachInfo;
import com.softleaf.groupware.dto.Board;
import com.softleaf.groupware.dto.BoardsParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.softleaf.groupware.service.BoardService;
import com.softleaf.groupware.service.UserService;

@RestController
@RequestMapping("/board")
public class BoardController {

	private BoardService boardService;
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	private SeqMapper seqMapper;

	@Autowired
	private AttachInfoMapper attachInfoMapper;
	
	@Autowired
	private UserService userService;
	
	public BoardController(BoardService boardService) {
		this.boardService = boardService;
	}

	@GetMapping("/listLength")
	public ResponseEntity<Integer> getBoardListCnt() throws Exception { // ResponseEntity : http status 코드도 같이 리턴 할 수
																		// 있다.
		HashMap<String, Object> map = new HashMap<>();
		int totalCount = boardService.getBoardListCnt(map);
		return new ResponseEntity<>(totalCount, HttpStatus.OK); // board데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}

	// 모두 가져오기
	@GetMapping("/list")
	public ResponseEntity<JSONObject> getBoardList(BoardsParams search) throws Exception { // ResponseEntity : http
																							// status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		JSONArray dataList = new JSONArray();
		JSONObject jsonResult = new JSONObject();

		logger.info("search Param =====> startPage : " + search.getStartPage() 
			+ ", currentPage : " + search.getCurrentPage()
			+ ", pagingCount : " + search.getPagingCount()
			+ ", rowsPerPage : " + search.getRowsPerPage()
			+ ", schCodeName : " + search.getSchBoardName());
		
		map.put("currentPage", search.getCurrentPage());
		map.put("startNum", (search.getCurrentPage()-1)*search.getRowsPerPage());
		map.put("pagingCount", search.getPagingCount());
		map.put("rowsPerPage", search.getRowsPerPage());
		map.put("schTitle", search.getSchBoardName());

		int totalCount = boardService.getBoardListCnt(map);

		search.setTotalCount(totalCount, map);
		
		System.out.println("totalCount >>>>>>>>>>" + totalCount);
		System.out.println("search.getSchRowsPerPage() >>>>>>>>>>" + search.getSchRowsPerPage());
		System.out.println("search.getStartPage() >>>>>>>>>>" + search.getStartPage());
		
		List<Board> boardList = boardService.getBoardList(map);

		for (Board board : boardList) {
			JSONObject obj = new JSONObject();
			obj.put("boardId", board.getBoardId());
			obj.put("boardType", board.getBoardType());
			obj.put("title", board.getTitle());
			obj.put("contents", board.getContents());
			obj.put("readCnt", board.getReadCnt());
			obj.put("updateDate", board.getUpdateDate());
			obj.put("createUserNm", board.getUserName());
			obj.put("attachFileCnt", board.getAttachFileCnt());
			obj.put("useYn", board.getUseYn());
			dataList.add(obj);

		}

		jsonResult.put("dataList", dataList);
		jsonResult.put("startPage", search.getStartPage());
		jsonResult.put("currentPage", search.getCurrentPage());
		jsonResult.put("endPage", search.getEndPage());
		jsonResult.put("totalPage", search.getTotalPage());

		return new ResponseEntity<>(jsonResult, HttpStatus.OK); // board데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}

	final String boardStr = "BOARD_ID";
	final String attStr = "BOARD_ATTACH_ID";

	// 저장하기
	@PostMapping("/reg") // ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> postReg( /* Json으로 받음 */ Board board, HttpServletRequest request,
			HttpServletResponse response, @RequestParam(value = "file", required = false) MultipartFile[] files)
			throws Exception {

		logger.info("Board ==========>>>>> postReg");

		HashMap<String, Object> map = new HashMap<String, Object>();

		String FileNames = "";
		String filepath = Constants.BOARD_DOWN_LOAD_PATH; // 파일 경로 설정
		String seq = seqMapper.getSequenceInfo(boardStr);
		seqMapper.updateSequenceInfo(boardStr);

		// List<Map> transFile = null;
		// transFile = FileUtil.multiUploadFile(request, Constants.BOARD_DOWN_LOAD_PATH,
		// Constants.BOARD_SUB_FOLDER);

		if (files != null) { // 파일이 있을 때
			for (MultipartFile mf : files) {
				String originFileName = mf.getOriginalFilename();
				long filesSize = mf.getSize(); // 파일 사이즈

				String safeFile = System.currentTimeMillis() + originFileName; // 파일명 중복 방지 (시간 + 파일명)

				FileNames = FileNames + "," + safeFile;
				try {
					File f1 = new File(filepath + safeFile);
					mf.transferTo(f1); // 전송된 파일을 지정 경로에 저장시킨다.
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}

				HashMap<String, Object> fMap = new HashMap<String, Object>();

				String attSeq = seqMapper.getSequenceInfo(attStr);
				seqMapper.updateSequenceInfo(attStr);
				
				int idx = originFileName.indexOf(".");
				String ext = originFileName.substring(idx+1);

				fMap.clear();

				fMap.put("boardId", seq);
				fMap.put("attatchId", attSeq); // 하드코딩
				fMap.put("orgFileNm", originFileName);
				fMap.put("saveFilePath", Constants.BOARD_DOWN_LOAD_PATH);
				fMap.put("saveFileNm", safeFile); // 원래 filesname+safefile
				fMap.put("fileSize", filesSize);
				fMap.put("fileExt", ext);
				fMap.put("userId", 1);

				attachInfoMapper.insertAttachInfo(fMap);

			}
		}

		String title = request.getParameter("title");
		String contents = request.getParameter("contents");

		// 등록데이타 유효성 체크
		if (title == null || "".equals(title)) {
			throw new Exception("title not Exits ");
		} else {
			map.put("title", title);
		}

		if (contents == null || "".equals(contents)) {
			throw new Exception("title not Exits ");
		} else {
			map.put("contents", contents);
		}

		map.put("boardType", "NOTICE");
		map.put("readCnt", 0);
		map.put("title", board.getTitle());
		map.put("contents", board.getContents());
		map.put("useYn", "Y");
		map.put("userId", 1);
		map.put("boardId", seq);

		return new ResponseEntity<>(boardService.insertBoard(map), HttpStatus.CREATED);
	}

	// 한건 가져오기
	@GetMapping("detail/{board-id}") // ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> getBoardInfo(@PathVariable("board-id") String boardId) throws Exception {
		HashMap<String, Object> map = new HashMap<>();

		if (boardId == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("boardId", boardId);
		}
		// 조회수 증가
		HashMap<String, Object> jmap = new HashMap<String, Object>();
			jmap.clear();
			jmap.put("boardId", boardId);
			jmap.put("readCntPlus", "readCntPlus");						
			boardService.updateBoard(jmap);
		return new ResponseEntity<>(boardService.getBoardInfo(map), HttpStatus.OK);
	}

	// 수정하기
	@PostMapping("/update/{board-id}") // ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> updateBoard(@PathVariable("board-id") String boardId, Board board, HttpServletRequest request,
			HttpServletResponse response, @RequestParam(value = "file", required = false) MultipartFile[] files)
			throws Exception {
			HashMap<String, Object> map = new HashMap<String, Object>();
	
			String FileNames = "";
			String filepath = Constants.BOARD_DOWN_LOAD_PATH; // 파일 경로 설정
			seqMapper.updateSequenceInfo(boardStr);		
			
			if (files != null) { // 파일이 있을 때
				for (MultipartFile mf : files) {
					String originFileName = mf.getOriginalFilename();
					long filesSize = mf.getSize(); // 파일 사이즈
	
					String safeFile = System.currentTimeMillis() + originFileName; // 파일명 중복 방지 (시간 + 파일명)
	
					FileNames = FileNames + "," + safeFile;
					try {
						File f1 = new File(filepath + safeFile);
						mf.transferTo(f1); // 전송된 파일을 지정 경로에 저장시킨다.
					} catch (IllegalStateException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
	
					HashMap<String, Object> fMap = new HashMap<String, Object>();
	
					String attSeq = seqMapper.getSequenceInfo(attStr);
					seqMapper.updateSequenceInfo(attStr);
					
					int idx = originFileName.indexOf(".");
					String ext = originFileName.substring(idx+1);

					fMap.clear();

					fMap.put("boardId", boardId);
					fMap.put("attatchId", attSeq);
					fMap.put("orgFileNm", originFileName);
					fMap.put("saveFilePath", Constants.BOARD_DOWN_LOAD_PATH);
					fMap.put("saveFileNm", safeFile); // 원래 filesname+safefile
					fMap.put("fileSize", filesSize);
					fMap.put("fileExt", ext);
					fMap.put("userId", 1);
	
					attachInfoMapper.insertAttachInfo(fMap);

				}
			}
			
			String title = request.getParameter("title");
			String contents = request.getParameter("contents");
	
			// 등록데이타 유효성 체크
			if (title == null || "".equals(title)) {
				throw new Exception("title not Exits ");
			} else {
				map.put("title", title);
			}
	
			if (contents == null || "".equals(contents)) {
				throw new Exception("title not Exits ");
			} else {
				map.put("contents", contents);
			}
			
			map.put("boardType", "NOTICE");
			map.put("readCnt", board.getReadCnt());
			map.put("title", board.getTitle());
			map.put("contents", board.getContents());
			map.put("useYn", board.getUseYn());
			map.put("userId", 1);
			map.put("boardId", boardId);
			
		
		return new ResponseEntity<>(boardService.updateBoard(map), HttpStatus.OK);
	}
	
	// 삭제하기
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteBoard(BoardsParams param) throws Exception {
			HashMap<String, Object> map = new HashMap<>();
			
			logger.info("delete Param =====> boardIdList : " + param.getBoardIdList());
			
			ArrayList<String> boardIdList = param.getBoardIdList();
			if(boardIdList.size() <= 0) {
				throw new IllegalArgumentException("param In id not Exits ");
			} else {
				map.put("boardIdList", boardIdList);
			}

			return new ResponseEntity<>(boardService.deleteBoard(map), HttpStatus.OK);
		}

	// 첨부파일 삭제
	@PostMapping("/delAttach/*")
	public ResponseEntity<?> deleteAttach(HttpServletRequest request,HttpServletResponse response,Model model) throws Exception{
			logger.info("board > delAttatch");
			logger.debug("param board = >>>> "+request.getParameter("boardId"));
			logger.debug("param attatchId = >>>> "+request.getParameter("attatchId"));
			
			String procStatus = "";
			//전체데이타 리터 json 변수
			JSONObject jsonResult = new JSONObject();
			
		
			String boardId = request.getParameter("boardId");
			String attatchId = request.getParameter("attatchId");
				
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("boardId", boardId);
			map.put("attatchId", attatchId);
			
			AttachInfo attachInfo = boardService.getAttachInfo(map);
			
			String saveFilePath = attachInfo.getSaveFilePath();
			String saveFileNm = attachInfo.getSaveFileNm();
			
			String saveLoc = saveFilePath+File.separatorChar+saveFileNm;
			
			File file = new File(saveLoc);
			if(file.exists())
				file.delete();
				
			System.out.println(jsonResult.toString());

			return new ResponseEntity<>(boardService.deleteAttachInfo(map), HttpStatus.OK);
		}
		
		

	// 첨부파일 다운
	@PostMapping("/attachDown/*")
	public void postDownAttatch(HttpServletRequest request,HttpServletResponse response,Model model ,
			@RequestParam(value = "file", required = false) MultipartFile[] files)  throws Exception{
			logger.info("board > downAttatch");
			logger.debug("param board = >>>> "+request.getParameter("boardId"));
			logger.debug("param attatchId = >>>> "+request.getParameter("attatchId"));
			
			boolean isError = false;
			String errMsg = "";
			
			try {
				String boardId = request.getParameter("boardId");
				String attatchId = request.getParameter("attatchId"); 
					
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("boardId", boardId);
				map.put("attatchId", attatchId);
				
				AttachInfo attachInfo = boardService.getAttachInfo(map);
				
				String saveFilePath = attachInfo.getSaveFilePath();
				String saveFileNm = attachInfo.getSaveFileNm();
				String orgFileNm = attachInfo.getOrgFileNm();
				
				HashMap<String, Object> attatchFile = new HashMap<String, Object>();
				attatchFile.put("saveFilePath", saveFilePath);
				attatchFile.put("saveFileNm", saveFileNm);
				attatchFile.put("orgFileNm", orgFileNm);

				String saveLoc = saveFilePath+File.separatorChar+saveFileNm;
				
				String header = getBrowser(request);
				response.setContentType("application/octet-stream");
				if (header.contains("MSIE")) {
				       String docName = URLEncoder.encode(saveFileNm,"UTF-8").replaceAll("\\+", "%20");
				       response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");
				} else if (header.contains("Firefox")) {
				       String docName = new String(saveFileNm.getBytes("UTF-8"), "ISO-8859-1");
				       response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
				} else if (header.contains("Opera")) {
				       String docName = new String(saveFileNm.getBytes("UTF-8"), "ISO-8859-1");
				       response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
				} else if (header.contains("Chrome")) {
				       String docName = new String(saveFileNm.getBytes("UTF-8"), "ISO-8859-1");
				       response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
				}else{
					throw new IllegalArgumentException("알수없는 브라우저 입니다.");
				}
				
				File file = new File(saveLoc);	
				if(file.exists()) {
					BufferedInputStream input = new BufferedInputStream(new FileInputStream(file));
					BufferedOutputStream output = new BufferedOutputStream(response.getOutputStream());
					try{
						Constants.copyStreamFast(input, output);	
					}catch(IllegalArgumentException e){
						throw e;					
					}catch(Exception e){
						throw e;					
					}finally{
						if(output != null){output.close();}
						if(input != null){input.close();}
					}
				} else {
					throw new IllegalArgumentException("다운로드 대상 파일이 없습니다.");	
				}
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
				errMsg = e.getMessage();
				isError = true;
			} catch (Exception e) {
				e.printStackTrace();
				errMsg = e.getMessage();
				isError = true;
			}finally{			
				if(false == isError){
					
					//resp.setContentType("application/x-msdownload");
					//resp.setHeader("Content-Disposition", "attachment;filename=" + fileName +"."+extension+";");
				}else{
					response.setContentType("text/html; charset=euc-kr");
					String alert = "<script>alert(\'파일 다운로드에 실패하였습니다.<br/>확인해 주십시요!');self.close();</script>";
					response.getWriter().write(alert);
				}
				
				
				
			}
			
		}
		
		private String getBrowser(HttpServletRequest request) {
	        String header =request.getHeader("User-Agent");
	        if (header.contains("MSIE")) { return "MSIE";
	        } else if(header.contains("Chrome")) { return "Chrome";
	        } else if(header.contains("Opera")) { return "Opera";
	        }else {return "Firefox"; }
	 	}
		
		
		
}