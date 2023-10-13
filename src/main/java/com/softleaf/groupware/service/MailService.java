package com.softleaf.groupware.service;

import com.softleaf.groupware.common.Constants;
import com.softleaf.groupware.dao.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;

/**
 * 이메일 발송을 담당하는 클래스
 */
@Service
@Transactional
public class MailService {
    private final JavaMailSender emailSender;
    private final UserMapper userMapper;
    private final Logger logger = LoggerFactory.getLogger(MailService.class);

    public MailService(JavaMailSender emailSender, UserMapper userMapper) {
        this.emailSender = emailSender;
        this.userMapper = userMapper;
    }

    public void sendEmail(String toEmail) {
        try {
            MimeMessage emailForm = createEmailForm(toEmail);
            emailSender.send(emailForm);
        } catch (Exception e) {
            throw new RuntimeException("MailService.sendEmail exception occur : "+ e.getMessage());
        }
    }

    // 발신할 이메일 데이터 세팅
    private MimeMessage createEmailForm(String toEmail) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();

        String title = "[소프트리프] 이메일 인증";
        String key = this.createCode();

        logger.debug("Logger toEmail: {}, " +
                "title: {}, authCode: {}", toEmail, title, key);

        HashMap<String, Object> map = new HashMap<>();
        map.put("mailKey", key);
        map.put("loginId", toEmail);

        int sucFlg = userMapper.createAuthKey(map); // 인증키를 업데이트 한다.
        if(sucFlg <= 0) {
            throw new RuntimeException("======= createAuthKey Error =========");
        }

        try {
            message.setRecipients(MimeMessage.RecipientType.TO, toEmail);
            message.setSubject(title);
            String body = "";
            body += "<h3>"+ toEmail + "님 회원가입 해주셔서 감사합니다.</h3>";
            body += "[이메일 인증 확인]을 눌러주세요<br/>";
            body += "<h3><a href='" + Constants.FRONT_SERVER_ADDR + "/auth-email-confirm/" + toEmail +
                    "/" + key + "' target='_blenk'>이메일 인증 확인</a></h3>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return message;
    }

//    public void sendCodeToEmail(String toEmail) {
//        String title = "Travel with me 이메일 인증 번호";
//        String authCode = this.createCode();
//        mailService.sendEmail(toEmail, title, authCode);
//        // 이메일 인증 요청 시 인증 번호 Redis에 저장 ( key = "AuthCode " + Email / value = AuthCode )
//        redisService.setValues(AUTH_CODE_PREFIX + toEmail,
//                authCode, Duration.ofMillis(this.authCodeExpirationMillis));
//    }
//
    // 10자리 임의의 코드 값 생성
    private String createCode() {
        int lenth = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            logger.debug("MailService.createCode() exception occur");
            throw new RuntimeException(e.getMessage());
        }
    }
}
