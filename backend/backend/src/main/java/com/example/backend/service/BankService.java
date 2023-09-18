package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.bank.BankAccountInfo;
import com.example.backend.dto.bank.BankAccountListDto;
import com.example.backend.dto.bank.BankInfo;
import com.example.backend.dto.bank.BankListDto;
import com.example.backend.repository.bank.BankCustomRepository;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BankService {

    private final BankCustomRepository bankCustomRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public BankListDto.Response getBank(String userId) throws JsonProcessingException {

        List<BankInfo> bankInfoList = getBankInfoList();
        List<String> existBankName = bankCustomRepository.findCpCodeByMemberId(userId);

        for (BankInfo bankInfo : bankInfoList) {
            if (existBankName.contains(bankInfo.getName())) {
                bankInfo.setConnected(true);
            }
        }

        return new BankListDto.Response(bankInfoList);
    }

    public List<BankInfo> getBankInfoList() throws JsonProcessingException {
        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMydata(null, null, "/mydata/bank", HttpMethod.GET);
        RestDto<BankInfo> restDto = new RestDto<>(BankInfo.class, responseEntity);
        List<BankInfo> bankInfoList = (List<BankInfo>) restTemplateUtil
                .parseListBody(restDto, "companyInfoDtoList");

        return bankInfoList;
    }

    public BankAccountListDto.Response getBankAccount(BankAccountListDto.Request request,
            String userId)
            throws JsonProcessingException {

        List<BankAccountInfo> bankAccountInfoList = getBankAccountInfoList(request, userId);
        List<String> existBankAccount = bankCustomRepository.findAccountNumberByMemberId(userId);

        List<BankAccountInfo> response = new ArrayList<>();

        for (BankAccountInfo bankAccountInfo : bankAccountInfoList) {
            if (!existBankAccount.contains(bankAccountInfo.getAccount())) {
                response.add(bankAccountInfo);
            }
        }

        return new BankAccountListDto.Response(response);
    }

    public List<BankAccountInfo> getBankAccountInfoList(BankAccountListDto.Request request,
            String userId)
            throws JsonProcessingException {

        String myDataToken = redisUtil.getMyDataToken(userId);

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMydata(myDataToken, request, "/mydata/account", HttpMethod.POST);
        RestDto<BankAccountInfo> restDto = new RestDto<>(BankAccountInfo.class, responseEntity);
        List<BankAccountInfo> bankAccountInfoList = (List<BankAccountInfo>) restTemplateUtil
                .parseListBody(restDto, "userAccountList");

        return bankAccountInfoList;
    }
}