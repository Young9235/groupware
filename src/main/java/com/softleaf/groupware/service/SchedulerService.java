package com.softleaf.groupware.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class SchedulerService {
    private static final Logger logger = LoggerFactory.getLogger(SchedulerService.class);
    private final UserService userService;

    public SchedulerService(UserService userService) {
        this.userService = userService;
    }

    /**
     * 인증 안한 유저 삭제
     * @throws Exception -
     */
    @Scheduled(fixedDelay = 600000, initialDelay = 5000) // 10분마다 실행 (1분 = 60 * 1000 -> 10분 = 10 * 60000)
    public void deleteMailAuthNotUserList() throws Exception {
        HashMap<String, Object> map = new HashMap<>();
        ArrayList<Integer> userIdList = userService.getAuthNotUserIdList(map);
        logger.debug("delete userId List ====> " + userIdList);

        if(userIdList.size() > 0) {
            map.put("userIdList", userIdList);
            userService.deleteAuthUser(map);
            logger.debug("====== delete userId List success ======");
        }

    }
}