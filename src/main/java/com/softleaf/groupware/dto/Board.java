package com.softleaf.groupware.dto;

import java.util.List;

public class Board {


	private String boardId;

	private String boardType;
	private String title;
	private String contents;
	private String useYn;
	private int readCnt;
	private int createId;
	private int updateId;
	private String createDate;
	private String updateDate;
	
	private String fileSize;
	private String orgFileNm;
	private String saveFileNm;
	
	 // 조인
    private String userName;
	
	// 첨부파일
	int attachFileCnt;
	List<AttachInfo> attachList = null;
	private String attatchId;
	
	// 조회 조건 
	String schCreateNm = null;
	String schTitle = null;
	

	public String getBoardId() {
		return this.boardId;
	}

	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}

	public String getBoardType() {
		return this.boardType;
	}

	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContents() {
		return this.contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public String getUseYn() {
		return this.useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public int getReadCnt() {
		return this.readCnt;
	}

	public void setReadCnt(int readCnt) {
		this.readCnt = readCnt;
	}

	public int getCreateId() {
		return this.createId;
	}

	public void setCreateId(int createId) {
		this.createId = createId;
	}

	public int getUpdateId() {
		return this.updateId;
	}

	public void setUpdateId(int updateId) {
		this.updateId = updateId;
	}

	public String getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public int getAttachFileCnt() {
		return attachFileCnt;
	}

	public void setAttachFileCnt(int attachFileCnt) {
		this.attachFileCnt = attachFileCnt;
	}

	public String getSchCreateNm() {
		return schCreateNm;
	}

	public void setSchCreateNm(String schCreateNm) {
		this.schCreateNm = schCreateNm;
	}

	public String getSchTitle() {
		return schTitle;
	}

	public void setSchTitle(String schTitle) {
		this.schTitle = schTitle;
	}

	public List<AttachInfo> getAttachList() {
		return attachList;
	}

	public void setAttachList(List<AttachInfo> attachList) {
		this.attachList = attachList;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getOrgFileNm() {
		return orgFileNm;
	}

	public void setOrgFileNm(String orgFileNm) {
		this.orgFileNm = orgFileNm;
	}

	public String getSaveFileNm() {
		return saveFileNm;
	}

	public void setSaveFileNm(String saveFileNm) {
		this.saveFileNm = saveFileNm;
	}

	public String getAttatchId() {
		return attatchId;
	}

	public void setAttatchId(String attatchId) {
		this.attatchId = attatchId;
	}


}
