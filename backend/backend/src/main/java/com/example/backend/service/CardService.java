package com.example.backend.service;

import com.example.backend.config.redis.RedisDao;
import com.example.backend.dto.card.CardCompanyInfo;
import com.example.backend.dto.card.CardCompanyListDto;
import com.example.backend.repository.card.CardCustomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardCustomRepository cardCustomRepository;
    private final RedisDao redisDao;

    private final String MYDATA_KEY = "MYDATA&&&";


    public CardCompanyListDto.Response getCardCompany(String userId) {
        // bank 리스트를 mydata에 요청해야됨
        List<CardCompanyInfo> cardCompanyInfoList = getCardCompanyInfoList();

        // 내 연결된 계좌의 BankNameList를 가져옴
        List<String> existCardCompanyName = cardCustomRepository.findCpCodeByMemberId(userId);

        for (CardCompanyInfo cardCompanyInfo : cardCompanyInfoList) {
            if (existCardCompanyName.contains(cardCompanyInfo.getName())) {
                cardCompanyInfo.setConnected(true);
            }
        }

        return new CardCompanyListDto.Response(cardCompanyInfoList);


    }

    private List<CardCompanyInfo> getCardCompanyInfoList() {

        RestTemplate restTemplate = new RestTemplate();
        List<CardCompanyInfo> cardCompanyInfoList = new ArrayList<>();

        // header 값 설정하고 싶은거 설정하면 됨
        HttpHeaders httpHeaders = new HttpHeaders();
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        HttpEntity<?> entity = new HttpEntity<>(body, httpHeaders);

        ResponseEntity<String> respEntity = restTemplate
                .exchange("http://localhost:8081/mydata/cardCompany", HttpMethod.GET, entity,
                        String.class);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper
                    .enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);  // list deserialization 기능 활성화
            JsonNode jsonNode = objectMapper.readTree(respEntity.getBody());

            JsonNode data = objectMapper.readTree(String.valueOf(jsonNode.get("data")));
            JsonNode cardCompanyList = objectMapper.readTree(String.valueOf(data.get("companyInfoDtoList")));
            cardCompanyInfoList = objectMapper
                    .readValue(cardCompanyList.toString(), new TypeReference<List<CardCompanyInfo>>() {
                    });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return cardCompanyInfoList;

    }
}
