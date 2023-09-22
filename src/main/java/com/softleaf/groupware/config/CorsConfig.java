package com.softleaf.groupware.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

   @Bean
   public CorsFilter corsFilter() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true);   // credential 정보가 포함되어 있는 요청
      config.addAllowedOrigin("http://localhost:3300");
      config.addAllowedHeader("Content-Type, Accept, X-Requested-With, remember-me, Origin,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
      config.addAllowedMethod("POST, GET, OPTIONS, DELETE");

      source.registerCorsConfiguration("/**", config);
      return new CorsFilter(source);
   }

}
