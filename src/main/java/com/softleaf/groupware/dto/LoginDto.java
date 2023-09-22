package com.softleaf.groupware.dto;

/*
 * 외부와의 통신을 위한 DTO
 */
public class LoginDto {

   private String loginId;
   private String password;

   public LoginDto(String loginId, String password) {
      this.loginId = loginId;
      this.password = password;
   }

   public String getLoginId() {
      return loginId;
   }

   public void setLoginId(String loginId) {
      this.loginId = loginId;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }
}
