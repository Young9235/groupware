package com.softleaf.groupware.dto;

import java.util.ArrayList;

/*
 * 메뉴 정보
 */
public class MenuDTO extends Default$Domain {
	
	private int menuId;
    private String menuName;
    private int parentMenu;
    private String parentMenuNm;
    private String menuUrl;
    private String menuDesc;
    private String menuImgPath;
    private String menuLevel;
    private int menuOrder;
    private String menuType;
    private String useStatus;
    private String deleteStatus;
    private int createId;
    private String createDate;
    private int updateId;
    private String updateDate;
	
    
    // 조회조건 
	private String schMenuName;
	private String schMenuType;
	private ArrayList<String> menuIdList;
    
    public int getMenuId() {
		return menuId;
	}
	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public int getParentMenu() {
		return parentMenu;
	}
	public void setParentMenu(int parentMenu) {
		this.parentMenu = parentMenu;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public String getMenuDesc() {
		return menuDesc;
	}
	public void setMenuDesc(String menuDesc) {
		this.menuDesc = menuDesc;
	}
	public String getMenuImgPath() {
		return menuImgPath;
	}
	public void setMenuImgPath(String menuImgPath) {
		this.menuImgPath = menuImgPath;
	}
	public String getMenuLevel() {
		return menuLevel;
	}
	public void setMenuLevel(String menuLevel) {
		this.menuLevel = menuLevel;
	}
	public int getMenuOrder() {
		return menuOrder;
	}
	public void setMenuOrder(int menuOrder) {
		this.menuOrder = menuOrder;
	}
	public String getMenuType() {
		return menuType;
	}
	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}
	public String getUseStatus() {
		return useStatus;
	}
	public void setUseStatus(String useStatus) {
		this.useStatus = useStatus;
	}
	public String getDeleteStatus() {
		return deleteStatus;
	}
	public void setDeleteStatus(String deleteStatus) {
		this.deleteStatus = deleteStatus;
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
	public String getParentMenuNm() {
		return parentMenuNm;
	}
	public void setParentMenuNm(String parentMenuNm) {
		this.parentMenuNm = parentMenuNm;
	}
	public String getSchMenuName() {
		return schMenuName;
	}
	public void setSchMenuName(String schMenuName) {
		this.schMenuName = schMenuName;
	}
	public String getSchMenuType() {
		return schMenuType;
	}
	public void setSchMenuType(String schMenuType) {
		this.schMenuType = schMenuType;
	}
	public ArrayList<String> getMenuIdList() {
		return menuIdList;
	}
	public void setMenuIdList(ArrayList<String> menuIdList) {
		this.menuIdList = menuIdList;
	}
	



	
    
}
