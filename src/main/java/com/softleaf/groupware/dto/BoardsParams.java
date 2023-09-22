package com.softleaf.groupware.dto;

import java.util.ArrayList;

public class BoardsParams extends Default$Domain {	
	private String schBoardName;
	private ArrayList<String> boardIdList;
	
	public String getSchBoardName() {
		return schBoardName;
	}
	public void setSchBoardName(String schBoardName) {
		this.schBoardName = schBoardName;
	}
	public ArrayList<String> getBoardIdList() {
		return boardIdList;
	}
	public void setBoardIdList(ArrayList<String> boardIdList) {
		this.boardIdList = boardIdList;
	}
	
	
}
