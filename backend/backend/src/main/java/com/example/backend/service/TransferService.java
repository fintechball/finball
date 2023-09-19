package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.dto.transfer.TransferResponseDto;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import com.example.backend.repository.finballhistory.FinBallHistoryRepository;
import com.example.backend.type.DealType;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final RedisUtil redisUtil;
    private final RestTemplateUtil restTemplateUtil;
    private final FinBallAccountRepository finBallAccountRepository;
    private final FinBallHistoryRepository finBallHistoryRepository;

    public void transfer(Member member, AccountTransferDto.Request request)
            throws JsonProcessingException {
        String token = redisUtil.getMyDataToken(member.getUserId());

        ResponseEntity<String> response = restTemplateUtil.callMydata(token, request,
                "/mydata/transfer", HttpMethod.POST);
        RestDto<TransferResponseDto> restDto = new RestDto<>(TransferResponseDto.class,
                response);
        List<TransferResponseDto> transferInfoDtoList = (List<TransferResponseDto>) restTemplateUtil.parseListBody(
                restDto, "list");

        System.out.println(transferInfoDtoList);
        ifExistFinBallAccountDoUpdate(transferInfoDtoList, request.getValue());
    }

    public void ifExistFinBallAccountDoUpdate(List<TransferResponseDto> transferInfoDtoList,
            Long value) {

        for (TransferResponseDto transfer : transferInfoDtoList) {
            FinBallAccount finBallAccount = finBallAccountRepository.findById(
                            transfer.getAccountNumber()).get();

            // TODO 1. 핀볼계좌 히스토리 추가
            ifExistFinBallAccountDoRegisterHistory(finBallAccount, transfer, value);

            // TODO 2. 핀볼계좌 잔고 업데이트
            updateFinBallAccount(finBallAccount, transfer, value);
        }
    }

    public void updateFinBallAccount(FinBallAccount finBallAccount, TransferResponseDto transfer,
            Long value) {

        if (transfer.getType() == DealType.출금) {
            finBallAccount.updateBalance(-value);
        } else if (transfer.getType() == DealType.입금) {
            finBallAccount.updateBalance(value);
        }
    }

    public void ifExistFinBallAccountDoRegisterHistory(FinBallAccount finBallAccount,
            TransferResponseDto transfer, Long value) {
        

    }
}
