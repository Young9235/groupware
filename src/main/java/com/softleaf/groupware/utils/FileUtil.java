package com.softleaf.groupware.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.UUID;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.softleaf.groupware.dto.Attach;
import com.softleaf.groupware.dto.AttachDto;

public class FileUtil
{
	private static long MAX_FILE_SIZE = 100485760;
	// 원격 파일 다운로드 URL
	public static void uploadFileDown(String fileUrl, String saveFileNm, String uploadPath) {
	
		Path target = Paths.get(uploadPath, saveFileNm); // 파일 저장 경로

		try {
			URL url = new URL(fileUrl);
			InputStream in = url.openStream();
			Files.copy(in, target); // 저장
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static ArrayList<Attach> fileUpload(ArrayList<AttachDto> fileData, 
			String fileuploadPath, String subUploadPath) throws Exception {

		String uploadPath = fileuploadPath + File.separatorChar + subUploadPath;
		System.out.println("uploadPath ==> "+uploadPath);
		File saveFolder = new File(uploadPath);
		
		ArrayList<Attach> result = new ArrayList<>();

		if ((!saveFolder.exists()) || (saveFolder.isFile())) {
			saveFolder.mkdirs();
		}
		
		for(AttachDto file : fileData) {
			String fileUrl = file.getPreviewUrl();
			String fileName = file.getName();
			
			int index = fileName.lastIndexOf(".");
			String ext = fileName.substring(index); // 파일 확장자 추출
			String uuid = UUID.randomUUID().toString(); // 파일명 (랜덤생성)
			String saveFileNm = uuid + ext;
			
			FileUtil.uploadFileDown(fileUrl, saveFileNm, uploadPath);
		}
		
		return result;
	}
	
	public static List<Map> multiUploadFile(HttpServletRequest request, String fileuploadPath, String subUploadPath) throws Exception
	{
		
		MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;

		Map files = multiRequest.getFileMap();

		String uploadPath = fileuploadPath + File.separatorChar + subUploadPath;
		
		System.out.println("uploadPath ==> "+uploadPath);
		File saveFolder = new File(uploadPath);
		String fileName = null;
		List result = new ArrayList();

		boolean isDir = false;
		
		if ((!saveFolder.exists()) || (saveFolder.isFile())) {
			boolean bool1 = saveFolder.mkdirs();
		}
		
		//max file size check
		Iterator itr = files.entrySet().iterator();

		while (itr.hasNext()) {
			Map.Entry entry = (Map.Entry)itr.next();
			MultipartFile file = (MultipartFile)entry.getValue();
			System.out.println("File Size ===>>>  "+file.getSize());
			if(MAX_FILE_SIZE < file.getSize()) {
				throw new Exception("============ DownLoad File Size Over MaxSize =====================");
			}
		}
		
		Iterator fitr = files.entrySet().iterator();
		Map fileInfo = new HashMap();
		while (fitr.hasNext()) {
			Map.Entry entry = (Map.Entry)fitr.next();
			MultipartFile file = (MultipartFile)entry.getValue();
			String fileKey = (String)entry.getKey();
			fileName = file.getOriginalFilename();
			
			if (!"".equals(fileName)) {
				fileInfo = new HashMap();
				String nFileName = UUID.randomUUID().toString();

				String ext = fileName.substring(fileName.lastIndexOf("."));
				
				fileInfo.put("fileKey", fileKey);
				fileInfo.put("orgFileNm", fileName);
				fileInfo.put("saveFilePath", uploadPath);
				fileInfo.put("saveFileNm", nFileName + ext);
				fileInfo.put("fileExt", ext);
				fileInfo.put("fileSize", String.valueOf(file.getSize()));
				
				String filePath = uploadPath + File.separatorChar + nFileName + ext;
				file.transferTo(new File(filePath));
				
				result.add(fileInfo);				
			}
		}

		return result;
	}
	
}
