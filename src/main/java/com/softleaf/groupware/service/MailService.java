package com.softleaf.groupware.service;

import com.softleaf.groupware.service.impl.AuthServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpStatusCodeException;

import java.time.Duration;

/**
 * 이메일 발송을 담당하는 클래스
 */
@Service
@Transactional
public class MailService {
    private final JavaMailSender emailSender;
    private final Logger logger = LoggerFactory.getLogger(MailService.class);

    public MailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendEmail(String toEmail,
                          String title,
                          String text) throws Exception {
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);
        try {
            emailSender.send(emailForm);
        } catch (RuntimeException e) {
            logger.debug("MailService.sendEmail exception occur toEmail: {}, " +
                    "title: {}, text: {}", toEmail, title, text);
            throw new Exception(e.getMessage());
        }
    }

    // 발신할 이메일 데이터 세팅
    private SimpleMailMessage createEmailForm(String toEmail,
                                              String title,
                                              String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

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
//    // 10자리 임의의 코드 값 생성
//    private String createCode() {
//        int lenth = 6;
//        try {
//            Random random = SecureRandom.getInstanceStrong();
//            StringBuilder builder = new StringBuilder();
//            for (int i = 0; i < lenth; i++) {
//                builder.append(random.nextInt(10));
//            }
//            return builder.toString();
//        } catch (NoSuchAlgorithmException e) {
//            log.debug("MemberService.createCode() exception occur");
//            throw new BusinessLogicException(ExceptionCode.NO_SUCH_ALGORITHM);
//        }
//    }
}
