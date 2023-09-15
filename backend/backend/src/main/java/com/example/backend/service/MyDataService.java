package com.example.backend.service;

import com.example.backend.config.redis.RedisDao;
import com.example.backend.dto.member.MemberMyDataDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.Charset;
import java.time.Duration;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MyDataService {

    private final RedisDao redisDao;

    private final String MYDATA_KEY = "MYDATA&&&";
    private final int EXPIRATION_TIME = 60000 * 10; // 10일

    public void getToken(MemberMyDataDto.Request request, String userId) throws JsonProcessingException {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        ObjectMapper objectMapper = new ObjectMapper();

        String requestBody = objectMapper.writeValueAsString(request);

        HttpEntity<?> entity = new HttpEntity<>(requestBody, httpHeaders);

        ResponseEntity<String> respEntity = restTemplate
                .exchange("http://localhost:8081/login", HttpMethod.POST, entity, String.class);

        List<String> tokens = respEntity.getHeaders().getValuesAsList("Authorization");

        if (tokens.size() == 0) {
            throw new IllegalAccessError("정보가 잘못되었습니다.");
        }

        redisDao.deleteValues(MYDATA_KEY+userId);
        redisDao.setValues(MYDATA_KEY+userId, tokens.get(0),
                Duration.ofMillis(EXPIRATION_TIME)); // 새로운 리프레쉬 토큰 저장

    }
}