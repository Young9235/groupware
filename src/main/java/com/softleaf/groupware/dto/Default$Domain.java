package com.softleaf.groupware.dto;

import java.util.HashMap;

import com.softleaf.groupware.common.Constants;

public class Default$Domain {	
	/*
	 * 도메인 중 최상위 클래스
	 * 페이징, 기타 공통으로 사용되어지는 파라메터 사용
	 */
	private int rowNo;
	private int userId;
	private int startPage=1;
	private int endPage=1;
	private int totalPage=1;
	private int currentPage=1;
	private int totalCount=0;
	private int totalStatCount=0;
	private String pageMode="";
	
	//delete 시 리스트를 위한 변수
	private String checkedList			= null;
	//조회조건
	private String selSchBox			= null;
	private String selSchInput			= null;
	
	// 공통인풋박스 조회조건
	private String schInputBox			= null;
	
	private int schPage;
	private int schRowsPerPage;
	
	// 한페이지에 보여질 리스트 수(row 수)
	private int rowsPerPage;
	// 한페이지에 보여질 페이지 수
	private int pagingCount;
	
	private int startNum;
	private int recordCount;
	
	public int getStartNum() {
		return startNum;
	}
	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}
	public int getRecordCount() {
		return recordCount;
	}
	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}
	
	public int getRowNo() {
		return rowNo;
	}
	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}
	
	public String getSelSchBox() {
		return selSchBox;
	}
	public void setSelSchBox(String selSchBox) {
		this.selSchBox = selSchBox;
	}
	public String getSelSchInput() {
		return selSchInput;
	}
	public void setSelSchInput(String selSchInput) {
		this.selSchInput = selSchInput;
	}
	
	public String getCheckedList() {
		return checkedList;
	}
	public void setCheckedList(String checkedList) {
		this.checkedList = checkedList;
	}
	
	public void setPageMode(String pageMode) {
		this.pageMode = pageMode;
	} 
	public String getPageMode() {
		return this.pageMode;
	}
	
	public int getStartPage() {
		return startPage;
	}
	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
		
		//토탈 page 계산
		this.totalPage = this.totalCount/ Constants.RECORD_COUNT;
		//나누어 떨어지는 경우에는 상관없지만 나머지가 있는경우에는 +1을 해주어야 한다. 조회가 안된겨우에도 +1
		if(this.totalPage == 0 || this.totalCount%Constants.RECORD_COUNT != 0) {
			this.totalPage++;
		}
		
		if(this.totalPage <= this.currentPage)
			this.currentPage = this.totalPage;
		else if(this.currentPage < 1) 
			this.currentPage = 1;
		
		
		//start page 값 셋팅
		this.startPage = ((this.currentPage-1)/Constants.PAGING_COUNT)*Constants.PAGING_COUNT+1;
		
		//this.currentPage ==1 일 경우에는 0 값이 나올수 있다.
		if(this.startPage < 1)
			this.startPage = 1;
		
		//토탈 page 계산 후 총 pageing 시 endPage 값 계산해야 한다.		
		if(startPage+Constants.PAGING_COUNT <= this.totalPage) {
			this.endPage = startPage+Constants.PAGING_COUNT-1;
		} else {
			this.endPage = this.totalPage;
		}
	}
	
	public void setTotalCount(int totalCount, int PARAM_RECORD_COUNT) {
		this.totalCount = totalCount;
		
		//토탈 page 계산
		this.totalPage = this.totalCount/PARAM_RECORD_COUNT;
		//나누어 떨어지는 경우에는 상관없지만 나머지가 있는경우에는 +1을 해주어야 한다. 조회가 안된겨우에도 +1
		if(this.totalPage == 0 || this.totalCount%PARAM_RECORD_COUNT != 0) {
			this.totalPage++;
		}
		
		if(this.totalPage <= this.currentPage)
			this.currentPage = this.totalPage;
		else if(this.currentPage < 1) 
			this.currentPage = 1;
		
		
		//start page 값 셋팅
		this.startPage = ((this.currentPage-1)/Constants.PAGING_COUNT)*Constants.PAGING_COUNT+1;
		
		//this.currentPage ==1 일 경우에는 0 값이 나올수 있다.
		if(this.startPage < 1)
			this.startPage = 1;
		
		//토탈 page 계산 후 총 pageing 시 endPage 값 계산해야 한다.		
		if(startPage+Constants.PAGING_COUNT <= this.totalPage) {
			this.endPage = startPage+Constants.PAGING_COUNT-1;
		} else {
			this.endPage = this.totalPage;
		}
	}
	
	public void setTotalCount(int totalCount, int PARAM_RECORD_COUNT, int currentPage) {
		this.totalCount = totalCount;
		
		//토탈 page 계산
		this.totalPage = this.totalCount/PARAM_RECORD_COUNT;
		//나누어 떨어지는 경우에는 상관없지만 나머지가 있는경우에는 +1을 해주어야 한다. 조회가 안된겨우에도 +1
		if(this.totalPage == 0 || this.totalCount%PARAM_RECORD_COUNT != 0) {
			this.totalPage++;
		}
		
		//start page 값 셋팅
		this.startPage = ((currentPage-1)/Constants.PAGING_COUNT)*Constants.PAGING_COUNT+1;
		
		//this.currentPage ==1 일 경우에는 0 값이 나올수 있다.
		if(this.startPage < 1)
			this.startPage = 1;
		
		if(this.totalPage <= currentPage)
			currentPage = this.startPage;
		else if(currentPage < 1) 
			currentPage = 1;
		
		//토탈 page 계산 후 총 pageing 시 endPage 값 계산해야 한다.		
		if(startPage+Constants.PAGING_COUNT <= this.totalPage) {
			this.endPage = startPage+Constants.PAGING_COUNT-1;
		} else {
			this.endPage = this.totalPage;
		}
	}
	
	public void setTotalCount(int totalCount, HashMap<String, Object> map) {
		this.totalCount = totalCount;
		int PARAM_RECORD_COUNT = (Integer)map.get("rowsPerPage");
		int PAGING_COUNT = (Integer)map.get("pagingCount");
		int currentPage = (Integer)map.get("currentPage");
		
		//토탈 page 계산
		this.totalPage = this.totalCount/PARAM_RECORD_COUNT;
		//나누어 떨어지는 경우에는 상관없지만 나머지가 있는경우에는 +1을 해주어야 한다. 조회가 안된겨우에도 +1
		if(this.totalPage == 0 || this.totalCount%PARAM_RECORD_COUNT != 0) {
			this.totalPage++;
		}
		
		//start page 값 셋팅
		this.startPage = ((currentPage-1)/PAGING_COUNT)*PAGING_COUNT+1;
		
		//this.currentPage ==1 일 경우에는 0 값이 나올수 있다.
		if(this.startPage < 1)
			this.startPage = 1;
		
		//토탈 page 계산 후 총 pageing 시 endPage 값 계산해야 한다.		
		if(startPage+PAGING_COUNT <= this.totalPage) {
			this.endPage = startPage+PAGING_COUNT-1;
		} else {
			this.endPage = this.totalPage;
		}
	}
	
	private String downFileName = null;

	public String getDownFileName() {
		return downFileName;
	}
	public void setDownFileName(String downFileName) {
		this.downFileName = downFileName;
	}
	public int getTotalStatCount() {
		return totalStatCount;
	}
	
	public int getSchPage() {
		return schPage;
	}
	public void setSchPage(int schPage) {
		this.schPage = schPage;
	}
	public int getSchRowsPerPage() {
		return schRowsPerPage;
	}
	public void setSchRowsPerPage(int schRowsPerPage) {
		this.schRowsPerPage = schRowsPerPage;
	}
	public int getRowsPerPage() {
		return rowsPerPage;
	}
	public void setRowsPerPage(int rowsPerPage) {
		this.rowsPerPage = rowsPerPage;
	}
	public int getPagingCount() {
		return pagingCount;
	}
	public void setPagingCount(int pagingCount) {
		this.pagingCount = pagingCount;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getSchInputBox() {
		return schInputBox;
	}
	public void setSchInputBox(String schInputBox) {
		this.schInputBox = schInputBox;
	}
	
}
