package com.softleaf.groupware.dao;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper	// @Repository안에 존재 포함하고 있음, 작은단위 @MapperScan 필히 사용해야함 -> 어느것을 사용해도 상관없..지만 부트에서는 Mapper을 주로 쓰는듯보인다...
public interface UserAuthMapper {
	List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception;
	
	// 등록
	void insertAuthMapping(UserDTO user);

	int insertAuth(HashMap<String, Object> map) throws Exception;

	// 수정
	int updateUser(UserDTO user);
	
	// 삭제
	int deleteUser(int id);


	
	
	


}
