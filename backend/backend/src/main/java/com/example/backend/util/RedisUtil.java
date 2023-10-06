package com.example.backend.util;

import com.example.backend.config.redis.RedisDao;
import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisDao redisDao;

    private final String MYDATA_KEY = "MYDATA&&&";

    private int SEC = 1;
    private int MINUTE = SEC * 60;
    private int HOUR = MINUTE * 60;
    private int DAY = 24 * HOUR;
    private int EXPIRATION_TIME = 60 * DAY * 1000;

    public void storeMyDataToken(String userId, ResponseEntity<String> respEntity) {

        List<String> tokens = respEntity.getHeaders().getValuesAsList("Authorization");

        if (tokens.size() == 0) {
            throw new IllegalAccessError("mydata 로그인 정보가 잘못되었습니다.");
        }

        redisDao.deleteValues(MYDATA_KEY + userId);
        redisDao.setValues(MYDATA_KEY + userId, tokens.get(0),
                Duration.ofMillis(EXPIRATION_TIME)); // 새로운 리프레쉬 토큰 저장
    }

    public String getMyDataToken(String userId) {

        String myDataToken = redisDao.getValues(MYDATA_KEY + userId);

        if (myDataToken == null || myDataToken.length() == 0) {
            throw new NoSuchElementException("토큰이 존재하지 않습니다. 다시 로그인하세요");
        }

        return myDataToken;
    }

}
