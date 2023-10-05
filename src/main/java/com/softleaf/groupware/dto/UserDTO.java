package com.softleaf.groupware.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * 회원 정보
 */
public class UserDTO extends Default$Domain {

	private int userId;
    private String loginId;
    private String userName;
    private String password;
    private String phoneNum;
    private String useStatus;
	private String approvYn;
	private String refreshToken;
    private int createId;
    private String createDate;
    private int updateId;
    private String updateDate;
	private String roles;
	private int cnt;
    
    // 조인 확장
    private int authId;
    
    // 조회 조건
	private String schUserName;
	private ArrayList<String> userIdList;

	// ENUM으로 안하고 ,로 해서 구분해서 ROLE을 입력 -> 그걸 파싱!!
	public List<String> getRoleList(){
		if(this.roles.length() > 0){
			return Arrays.asList(this.roles.split(","));
		}
		return new ArrayList<>();
	}

	public String getApprovYn() {
		return approvYn;
	}

	public void setApprovYn(String approvYn) {
		this.approvYn = approvYn;
	}

	@Override
	public int getUserId() {
		return userId;
	}

	@Override
	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getUseStatus() {
		return useStatus;
	}

	public void setUseStatus(String useStatus) {
		this.useStatus = useStatus;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
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

	public int getUpdateId() {
		return updateId;
	}

	public void setUpdateId(int updateId) {
		this.updateId = updateId;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
	}

	public int getAuthId() {
		return authId;
	}

	public void setAuthId(int authId) {
		this.authId = authId;
	}

	public String getSchUserName() {
		return schUserName;
	}

	public void setSchUserName(String schUserName) {
		this.schUserName = schUserName;
	}

	public ArrayList<String> getUserIdList() {
		return userIdList;
	}

	public void setUserIdList(ArrayList<String> userIdList) {
		this.userIdList = userIdList;
	}
}
