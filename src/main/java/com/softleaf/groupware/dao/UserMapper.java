package com.softleaf.groupware.dao;

import java.util.HashMap;
import java.util.List;

import com.softleaf.groupware.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper	// @Repository안에 존재 포함하고 있음, 작은단위 @MapperScan 필히 사용해야함 -> 어느것을 사용해도 상관없..지만 부트에서는 Mapper을 주로 쓰는듯보인다...
public interface UserMapper {

	UserDTO findByLoginId(String username);
	List<UserDTO> getUserList(HashMap<String, Object> map) throws Exception;
	// 등록
	int insertUser(UserDTO user) throws Exception;
	// 수정
	int updateUser(UserDTO user);
	// 삭제
	int deleteUser(int id);
	int insertAuth(HashMap<String, Object> map) throws Exception;
	int getUserListCnt(HashMap<String, Object> map) throws Exception;
	UserDTO getUserInfo(UserDTO user) throws Exception;
	int updateRefreshToken(HashMap<String, Object> map) throws Exception;
	UserDTO getUserRenew(String refreshToken);
	int getUserCheck(UserDTO user);
	int getLoginCheck(String loginId);
	int deleteUser(HashMap<String, Object> map);
	void insertAuthMapping(UserDTO user);


}
