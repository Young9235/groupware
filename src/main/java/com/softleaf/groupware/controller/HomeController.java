package com.softleaf.groupware.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * TEST용
 */
@RestController
public class HomeController {

	@GetMapping("/test")
	public ResponseEntity<String> test() throws Exception {	
		return ResponseEntity.ok("server start success");
	}

	@GetMapping("/hello")
	public ResponseEntity<String> hello() throws Exception {
		return ResponseEntity.ok("Hello, groupware!!!");
	}

}







