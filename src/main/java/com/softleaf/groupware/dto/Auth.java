package com.softleaf.groupware.dto;

import java.util.ArrayList;

public class Auth extends Default$Domain {
	/*
		auth_id varchar(10) PK 
		parent_auth_id varchar(10) 
		auth_name varchar(100) 
		description varchar(200) 
		auth_value varchar(500) 
		use_status varchar(1) 
		create_id int 
		create_date date 
		update_id int 
		update_date date
	*/
	
    private int authId;
    
    private int lastIdx;
    
    private String authName;	
    
    private String authDesc;	
    
    private String useStatus;	
    
    private String deleteStatus;	
    
    private String createDate;
    
    private String createId;
    
    private String updateId;
    
    private String updateDate;
    
    private String userName;
    
    private ArrayList<String> authIdList;
    
    private ArrayList<Integer> menuIdList;
    

	public String getAuthName() {
		return authName;
	}

	public void setAuthName(String authName) {
		this.authName = authName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getCreateId() {
		return createId;
	}

	public void setCreateId(String createId) {
		this.createId = createId;
	}

	public String getUpdateId() {
		return updateId;
	}

	public void setUpdateId(String updateId) {
		this.updateId = updateId;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getUseStatus() {
		return useStatus;
	}

	public void setUseStatus(String useStatus) {
		this.useStatus = useStatus;
	}

	public String getAuthDesc() {
		return authDesc;
	}

	public void setAuthDesc(String authDesc) {
		this.authDesc = authDesc;
	}

	public String getDeleteStatus() {
		return deleteStatus;
	}

	public void setDeleteStatus(String deleteStatus) {
		this.deleteStatus = deleteStatus;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public ArrayList<String> getAuthIdList() {
		return authIdList;
	}
	public void setAuthIdList(ArrayList<String> authIdList) {
		this.authIdList = authIdList;
	}

	public ArrayList<Integer> getMenuIdList() {
		return menuIdList;
	}

	public void setMenuIdList(ArrayList<Integer> menuIdList) {
		this.menuIdList = menuIdList;
	}

	public int getLastIdx() {
		return lastIdx;
	}

	public void setLastIdx(int lastIdx) {
		this.lastIdx = lastIdx;
	}

	public int getAuthId() {
		return authId;
	}

	public void setAuthId(int authId) {
		this.authId = authId;
	}


}
