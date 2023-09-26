package com.softleaf.groupware.service;

import com.softleaf.groupware.dto.UserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/*
 * UserDetailsService 임플리먼츠, userMapper을 주입받아 loadUserByUsername함수에서 사용 
 * => 유저정보 DB에서 가져와 유저가 존재하는지 않하는지 체크하여 유저객체를 리턴한다.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
   
	private final UserService userService;

	public CustomUserDetailsService(UserService userService) {
		this.userService = userService;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(final String loginId) {
		UserDTO user = userService.findByLoginId(loginId);
		if(user == null) {
			throw new UsernameNotFoundException(loginId + " -> 데이터베이스에서 찾을 수 없습니다.");
		}
		// 암호화된 비밀번호를 리턴해야함.. DB에 암호화된 비번으로 등록이 되있어야함(4일을 해맴...) -> 현재는 암호화하지 않았기때문에 서버에서 암호화함
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		System.out.println("login id ==> " + user.getLoginId() + "  password ==> " + user.getPassword()); // TODO 플로우 확실히 잡으셔야할듯? 의문의 누군가 남김
			  
		List<GrantedAuthority> grantedAuthorities = user.getRoleList().stream()
		          .map(authority -> new SimpleGrantedAuthority(user.getRoles()))
		          .collect(Collectors.toList());

		return new User(user.getLoginId(), user.getPassword(), grantedAuthorities);
	}
}
