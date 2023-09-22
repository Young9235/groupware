package com.softleaf.groupware.serviceImpl;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dao.BookMapper;
import com.softleaf.groupware.dao.SeqMapper;
import com.softleaf.groupware.dto.Book;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softleaf.groupware.service.BookService;



@Service
public class BookServiceImpl implements BookService {
	
	private final BookMapper bookMapper;
	private final SeqMapper seqMapper;
	private final String seqId = "BOOK_ID";
	
	public BookServiceImpl(BookMapper bookMapper, SeqMapper seqMapper) {
		this.bookMapper = bookMapper;
		this.seqMapper = seqMapper;
	}
	
	@Transactional(readOnly = true)	
	public int getBookListCnt(HashMap<String, Object> map) throws Exception {
		return bookMapper.getBookListCnt(map);
	}
	
	@Transactional(readOnly = true)		
	public List<Book> getBookList(HashMap<String, Object> map) throws Exception {
		return bookMapper.getBookList(map);
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteBook(HashMap<String, Object> map) throws Exception {
		int suc = bookMapper.deleteBook(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public Book getBookInfo(HashMap<String, Object> map) throws Exception {
		return bookMapper.getBookInfo(map);
	}
	
	@Transactional
	public int insertBook(HashMap<String, Object> map) throws Exception {
		
		String bookId = seqMapper.getSequenceInfo(seqId);
		seqMapper.updateSequenceInfo(seqId);
		map.put("bookId", bookId);
		
		int suc = bookMapper.insertBook(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public int updateBook(HashMap<String, Object> map) throws Exception {
		int suc = bookMapper.updateBook(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
//	@Override
//	public List<Book> insertBook() throws Exception {
//		if(boardMapper.save(boardDto) == 0){
//			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
//	   	}
//		
//		return bookMapper.getBookList();
//	}
	
}
