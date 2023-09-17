package com.example.backend.service;

import com.example.backend.config.redis.RedisDao;
import com.example.backend.dto.bank.BankAccountInfo;
import com.example.backend.dto.bank.BankAccountListDto;
import com.example.backend.dto.bank.BankInfo;
import com.example.backend.dto.bank.BankListDto;
import com.example.backend.repository.bank.BankCustomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class BankService {

    private final BankCustomRepository bankCustomRepository;
    private final RedisDao redisDao;

    private final String MYDATA_KEY = "MYDATA&&&";

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

        return new BankListDto.Response(bankInfoList);
    }

    public List<BankInfo> getBankInfoList() {

        RestTemplate restTemplate = new RestTemplate();
        List<BankInfo> bankInfoList = new ArrayList<>();

        // header 값 설정하고 싶은거 설정하면 됨
        HttpHeaders httpHeaders = new HttpHeaders();
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        HttpEntity<?> entity = new HttpEntity<>(body, httpHeaders);

        ResponseEntity<String> respEntity = restTemplate
                .exchange("http://localhost:8081/mydata/bank", HttpMethod.GET, entity,
                        String.class);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper
                    .enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);  // list deserialization 기능 활성화
            JsonNode jsonNode = objectMapper.readTree(respEntity.getBody());

            System.out.println(jsonNode);
            JsonNode data = objectMapper.readTree(String.valueOf(jsonNode.get("data")));
            JsonNode bankList = objectMapper.readTree(String.valueOf(data.get("bankList")));
            bankInfoList = objectMapper
                    .readValue(bankList.toString(), new TypeReference<List<BankInfo>>() {
                    });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return bankInfoList;
    }

    public BankAccountListDto.Response getBankAccount(BankAccountListDto.Request request,
            String userId)
            throws JsonProcessingException {

        // mydata에서 내 정보와 관련된 계좌들 다 가져와야됨
        List<BankAccountInfo> bankAccountInfoList = getBankAccountInfoList(request, userId);

        // 우리 DB에서 연결된 계좌 가져와야됨, 계좌번호로 가져오자
        List<String> existBankAccount = bankCustomRepository.findAccountNumberByMemberId(userId);

        List<BankAccountInfo> response = new ArrayList<>();

        // 연결 안된 계좌만 처리할꺼임
        for (BankAccountInfo bankAccountInfo : bankAccountInfoList) {
            if (!existBankAccount.contains(bankAccountInfo.getAccount())) {
                response.add(bankAccountInfo);
            }
        }

        return new BankAccountListDto.Response(response);
    }

    private List<BankAccountInfo> getBankAccountInfoList(BankAccountListDto.Request request,
            String userId)
            throws JsonProcessingException {

        RestTemplate restTemplate = new RestTemplate();
        List<BankAccountInfo> bankAccountInfoList = new ArrayList<>();

        String mydataToken = redisDao.getValues(MYDATA_KEY + userId);

        if (mydataToken == null || mydataToken.length() == 0) {
            throw new NoSuchElementException("토큰이 존재하지 않습니다. 다시 로그인하세요");
        }

        // header 값 설정하고 싶은거 설정하면 됨
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        httpHeaders.setBearerAuth(mydataToken);
        ObjectMapper objectMapper = new ObjectMapper();

        System.out.println(request.toString());

        String requestBody = objectMapper.writeValueAsString(request);

        HttpEntity<?> entity = new HttpEntity<>(requestBody, httpHeaders);

        ResponseEntity<String> respEntity = restTemplate
                .exchange("http://localhost:8081/mydata/account", HttpMethod.POST, entity,
                        String.class);

        try {
//            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper
                    .enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);  // list deserialization 기능 활성화
            JsonNode jsonNode = objectMapper.readTree(respEntity.getBody());
            JsonNode data = objectMapper.readTree(String.valueOf(jsonNode.get("data")));
            JsonNode bankAccountList = objectMapper
                    .readTree(String.valueOf(data.get("userAccountList")));
            bankAccountInfoList = objectMapper.readValue(bankAccountList.toString(),
                    new TypeReference<List<BankAccountInfo>>() {
                    });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return bankAccountInfoList;
    }
}