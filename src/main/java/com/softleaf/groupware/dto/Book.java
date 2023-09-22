package com.softleaf.groupware.dto;

import java.util.ArrayList;

public class Book extends Default$Domain {
	/*
		bookId varchar(20) PK 
        productCode varchar(45) 
        title varchar(45) 
        author varchar(20) 
        publicDate varchar(45) 
        description varchar(300) 
        inStockYn varchar(45) 
        inStockCnt varchar(45) 
        category varchar(45) 
        price varchar(10) 
        tagId varchar(45)
	*/
	
    private String bookId;
	
    private String productCode;	// 제품코드
    
    private String title;	// 제목
    
    private String author;	// 글쓴이
    
    private String description;	//내용
    
    private String category;	// 카테고리
    
    private String price;
    
    private ArrayList<AttachDto> fileData;

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public ArrayList<AttachDto> getFileData() {
		return fileData;
	}

	public void setFileData(ArrayList<AttachDto> fileData) {
		this.fileData = fileData;
	}
    
    

}
