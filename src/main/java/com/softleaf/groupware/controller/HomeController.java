package com.softleaf.groupware.controller;


import java.util.HashMap;

import com.softleaf.groupware.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.softleaf.groupware.service.UserService;


@RestController
@RequestMapping("/")
public class HomeController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/hello")
	public ResponseEntity<String> test() throws Exception {	
		return ResponseEntity.ok("Hello, groupware!!!");
	}
    
    @PostMapping("/login")
    public HashMap<String, Object> test(@RequestBody HashMap<String, Object> requestJsonHashMap) throws Exception{    	
    	
    	System.out.println("requestJsonHashMap" +requestJsonHashMap);
    	//response Data
    	HashMap<String, Object> rtnMap = new HashMap<String, Object>();
    	
    	UserDTO user = new UserDTO();
    	user.setLoginId((String) requestJsonHashMap.get("loginId"));
    	user.setPassword((String) requestJsonHashMap.get("password"));
    	
    	UserDTO profile = userService.getLoginCheck(user);
    	System.out.println("loginCheck>>>>>>>>>>>>" + profile.getCnt());
    	System.out.println("toString>>>>>>>>>>>>" + profile.getUserName());
    	
    	try {
    		if (profile.getCnt() > 0) {
    			rtnMap.put("result", 1);
    			rtnMap.put("idx", profile.getUserId());
    			rtnMap.put("loginId", profile.getLoginId());
    			rtnMap.put("password", profile.getPassword());
    			rtnMap.put("username", profile.getUserName());
    		}else {
    			rtnMap.put("error", "error");
    			throw new Exception ("login error");
    		}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
//    	
//    	rtnMap.put("requestData1", requestJsonHashMap);
//    	rtnArray.add(rtnMap);

    	return rtnMap; 
    }
	
	
}







