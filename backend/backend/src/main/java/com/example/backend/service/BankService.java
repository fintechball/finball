package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.bank.BankAccountDto;
import com.example.backend.dto.bank.BankAccountListDto;
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

        List<BankAccountDto> bankAccountDtoList = getBankAccountDtoList(request, userId);
        List<String> existBankAccount = bankCustomRepository.findAccountNumberByMemberId(userId);

        List<BankAccountDto> response = new ArrayList<>();

        for (BankAccountDto bankAccountDto : bankAccountDtoList) {
            if (!existBankAccount.contains(bankAccountDto.getAccountNumber())) {
                response.add(bankAccountDto);
            }
        }

        return new BankAccountListDto.Response(response);
    }

    public List<BankAccountDto> getBankAccountDtoList(BankAccountListDto.Request request,
            String userId)
            throws JsonProcessingException {

        String myDataToken = redisUtil.getMyDataToken(userId);

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMyData(myDataToken, request, "/myData/bank/account", HttpMethod.POST);
        RestDto<BankAccountDto> restDto = new RestDto<>(BankAccountDto.class, responseEntity);
        List<BankAccountDto> bankAccountDtoList = (List<BankAccountDto>) restTemplateUtil
                .parseListBody(restDto, "bankAccountList");

        return bankAccountDtoList;
    }
}