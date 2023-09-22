package com.softleaf.groupware.dto;

import java.util.ArrayList;

public class Code extends Default$Domain {
	/*
		code_id varchar(10) PK 
		parent_code_id varchar(10) 
		code_name varchar(100) 
		description varchar(200) 
		code_value varchar(500) 
		use_status varchar(1) 
		create_id int 
		create_date date 
		update_id int 
		update_date date
	*/
	
    private String codeId;
	
    private String parentCodeId;
    
    private String codeName;	
    
    private String codeValue;	
    
    private String description;	
    
    private String useStatus;	
    
    private String createDate;
    
    private String createId;
    
    private String updateId;
    
    private String updateDate;
    
    // 조인
    private String userName;
    
    private ArrayList<String> codeIdList;
    
    
	public String getCodeId() {
		return codeId;
	}

	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	public String getParentCodeId() {
		return parentCodeId;
	}

	public void setParentCodeId(String parentCodeId) {
		this.parentCodeId = parentCodeId;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public String getCodeValue() {
		return codeValue;
	}

	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
    
	public ArrayList<String> getCodeIdList() {
		return codeIdList;
	}
	public void setCodeIdList(ArrayList<String> codeIdList) {
		this.codeIdList = codeIdList;
	}

}
