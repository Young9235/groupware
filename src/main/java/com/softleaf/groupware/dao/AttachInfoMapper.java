package com.softleaf.groupware.dao;

import java.util.List;
import java.util.Map;

import com.softleaf.groupware.dto.AttachInfo;
import org.springframework.stereotype.Repository;


@Repository("AttachInfoMapper")
public interface AttachInfoMapper {
	int getAttachInfoCnt(Map<String, Object> map) throws Exception;
	
	AttachInfo getAttachInfo(Map<String, Object> map) throws Exception;
	
	List<AttachInfo> getAttachInfoList(Map<String, Object> map) throws Exception;
	
	int insertAttachInfo(Map<String, Object> map) throws Exception;
	
	int updateAttachInfo(Map<String, Object> map) throws Exception;
	
	int deleteAttachInfo(Map<String, Object> map) throws Exception;
	
}
