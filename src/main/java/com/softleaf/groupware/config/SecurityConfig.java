package com.softleaf.groupware.config;

import com.softleaf.groupware.config.jwt.JwtAccessDeniedHandler;
import com.softleaf.groupware.config.jwt.JwtAuthenticationEntryPoint;
import com.softleaf.groupware.config.jwt.JwtSecurityConfig;
import com.softleaf.groupware.config.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.filter.CorsFilter;

/*
 * jwt인증 절차를 여기서 주입함, security main 설정 -> 인증 controller
 */
@EnableWebSecurity	// webSecurity 사용
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final TokenProvider tokenProvider;
    private final CorsConfig corsConfig;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

	public SecurityConfig(TokenProvider tokenProvider, CorsConfig corsConfig,
						  JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
		this.tokenProvider = tokenProvider;
		this.corsConfig = corsConfig;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
	}

	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    // jwt 설정
    @Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	return http
		        // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
		        .csrf().disable()
		
		        .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class)	// cors 설정
		        
		        // 접근 에러 리턴
		        .exceptionHandling()
		        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
		        .accessDeniedHandler(jwtAccessDeniedHandler)
		        
		        // 세션을 사용하지 않기 때문에 STATELESS로 설정
		        .and()
		        .sessionManagement()
		        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		        
		        .and()
				.formLogin().disable()	// form 방식 사용X
				.httpBasic().disable()	// http 방식 사용X
		        
		        .apply(new JwtSecurityConfig(tokenProvider))	// 여기서 jwt custom filter 호출
//				.and()
//				.exceptionHandling()
//				.accessDeniedPage("/error")
		        // 회원가입과 로그인은 토큰이 없이 접근해야하기 때문에 모든 사람에게 열어줌 permitAll
		        .and()
				.authorizeRequests(authroize -> authroize.antMatchers("/api/**")
						//.access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")	// 특정 권한 사용자에게만 열어줌
						.permitAll()
						// .antMatchers("/sf/**").authenticated()		// andMatchers에 속해있는 URL로 요청이 오면 인증이 필요하다고 설정한다.
						.antMatchers("/login").permitAll()
						// .antMatchers("/hello").permitAll()
						.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
						.antMatchers("/user/**").access("hasRole('ROLE_USER')")
						.antMatchers("/user/**")
						.access("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
						.anyRequest().authenticated())	// 인증 요청 구문 설정해준 URL 이외의 것은 허용하지 않겠다.
				.build();
    }

}