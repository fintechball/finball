package com.example.backend.service;

import com.example.backend.dto.bank.BankInfo;
import com.example.backend.dto.bank.BankListDto;
import com.example.backend.dto.bank.BankListDto.Response;
import com.example.backend.repository.bank.BankCustomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class BankService {

    private final BankCustomRepository bankCustomRepository;

    public BankListDto.Response getBank(String userId) {

        // bank 리스트를 mydata에 요청해야됨
        List<BankInfo> bankInfoList = getBankInfoList();

        // 내 연결된 계좌의 BankNameList를 가져옴
        List<String> existBankName = bankCustomRepository.findCpCodeByMemberId(userId);

        for (BankInfo bankInfo : bankInfoList) {
            if (existBankName.contains(bankInfo.getName())) {
                bankInfo.setConnected(true);
            }
        }

        return new Response(bankInfoList);
    }

    public List<BankInfo> getBankInfoList() {

        RestTemplate restTemplate = new RestTemplate();
        List<BankInfo> bankInfoList = new ArrayList<>();

        // header 값 설정하고 싶은거 설정하면 됨
        HttpHeaders httpHeaders = new HttpHeaders();
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        HttpEntity<?> entity = new HttpEntity<>(body, httpHeaders);

        ResponseEntity<String> respEntity = restTemplate.exchange("http://localhost:8081/bank", HttpMethod.GET, entity, String.class);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);  // list deserialization 기능 활성화
            JsonNode jsonNode = objectMapper.readTree(respEntity.getBody());
            JsonNode data = objectMapper.readTree(String.valueOf(jsonNode.get("data")));
            JsonNode bankList = objectMapper.readTree(String.valueOf(data.get("bankList")));
            bankInfoList = objectMapper.readValue(bankList.toString(), new TypeReference<List<BankInfo>>(){});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return bankInfoList;
    }
}
