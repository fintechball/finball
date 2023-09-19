package com.example.backend.service;

import com.example.backend.dto.member.MyDataAuthDto;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyDataService {

    private final RedisUtil redisUtil;
    private final RestTemplateUtil restTemplateUtil;

    public void getToken(MyDataAuthDto.Request request, String userId)
            throws JsonProcessingException {

        ResponseEntity<String> respEntity = restTemplateUtil.callMydata(null, request, "/login",
                HttpMethod.POST);
        redisUtil.storeMyDataToken(userId, respEntity);
    }
}