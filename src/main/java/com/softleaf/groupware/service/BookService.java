package com.softleaf.groupware.service;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.Book;


public interface BookService {

	public List<Book> getBookList(HashMap<String, Object> map) throws Exception;
	
	public int insertBook(HashMap<String, Object> map) throws Exception;
	
	public int updateBook(HashMap<String, Object> map) throws Exception;
	
	public int deleteBook(HashMap<String, Object> map) throws Exception;
	
	public Book getBookInfo(HashMap<String, Object> map) throws Exception;

	public int getBookListCnt(HashMap<String, Object> map) throws Exception;
}
