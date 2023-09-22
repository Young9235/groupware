package com.softleaf.groupware.dto;

public class AttachInfo extends Default$Domain {
	/*
	 boardId varchar(25) PK 
	AttatchId varchar(20) PK 
	orgFileNm varchar(200) 
	saveFilePath varchar(1000) 
	fileSize varchar(10) 
	fileExt varchar(20) 
	saveFileNm varchar(200) 
	createId int(11) 
	createDate varchar(25)
	 
	
    */
	
	String boardId = null;
	String attatchId = null;
	String orgFileNm = null;
	String saveFilePath = null;
	String fileSize = null;
	String fileExt = null;
	String saveFileNm = null;
		
	int createId;
	String createDate = null;	
	
	public String getBoardId() {
		return boardId;
	}
	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}
	public String getAttatchId() {
		return attatchId;
	}
	public void setAttatchId(String attatchId) {
		this.attatchId = attatchId;
	}
	public String getOrgFileNm() {
		return orgFileNm;
	}
	public void setOrgFileNm(String orgFileNm) {
		this.orgFileNm = orgFileNm;
	}
	public String getSaveFilePath() {
		return saveFilePath;
	}
	public void setSaveFilePath(String saveFilePath) {
		this.saveFilePath = saveFilePath;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public String getFileExt() {
		return fileExt;
	}
	public void setFileExt(String fileExt) {
		this.fileExt = fileExt;
	}
	public String getSaveFileNm() {
		return saveFileNm;
	}
	public void setSaveFileNm(String saveFileNm) {
		this.saveFileNm = saveFileNm;
	}
	public int getCreateId() {
		return createId;
	}
	public void setCreateId(int createId) {
		this.createId = createId;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	
}
