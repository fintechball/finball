package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.mydata.history.AccountHistoryDto;
import com.example.backend.dto.mydata.history.AccountHistoryListDto;
import com.example.backend.dto.mydata.history.AccountHistoryListDto.Request;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.FinBallHistory;
import com.example.backend.entity.Member;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import com.example.backend.repository.finballhistory.FinBallHistoryCustomRepository;
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
public class HistoryService {

    private final FinBallHistoryCustomRepository finBallHistoryCustomRepository;
    private final FinBallAccountRepository finBallAccountRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public AccountHistoryListDto.Response getHistory(String accountNo, Member member) throws JsonProcessingException {
        List<AccountHistoryDto> historyDtoList;

        if(isAccountFinBall(accountNo)) {
            historyDtoList = getFinBallHistory(accountNo);
        }
        else {
            AccountHistoryListDto.Request request = new Request(accountNo);
            historyDtoList = getMyDataResponse(request, member.getUserId());
        }

        return new AccountHistoryListDto.Response(historyDtoList);
    }

    public boolean isAccountFinBall(String accountNo) {
        FinBallAccount finBallAccount = finBallAccountRepository.findById(accountNo)
                .orElse(null);
        return finBallAccount != null;
    }

    public List<AccountHistoryDto> getFinBallHistory(String accountNo) {
        List<AccountHistoryDto> historyDtoList = new ArrayList<>();
        List<FinBallHistory> finBallHistoryList = finBallHistoryCustomRepository
                .findAllByAccountId(accountNo);

        for(FinBallHistory finBallHistory : finBallHistoryList) {
            historyDtoList.add(new AccountHistoryDto(finBallHistory));
        }

        return historyDtoList;
    }

    public List<AccountHistoryDto> getMyDataResponse(Request request, String memberId)
            throws JsonProcessingException {
        String token = redisUtil.getMyDataToken(memberId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                request, "/my-data/account/history",
                HttpMethod.POST);

        RestDto<AccountHistoryDto> restDto = new RestDto<>(AccountHistoryDto.class,
                response);

        System.out.println(restDto);

        return (List<AccountHistoryDto>) restTemplateUtil.parseListBody(
                restDto, "tradeHistoryList");
    }
}
