package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.dto.transfer.AccountTransferDto.Request;
import com.example.backend.dto.transfer.FinBallTradeHistoryDto;
import com.example.backend.dto.transfer.TransferInfoDto;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import com.example.backend.repository.finballhistory.FinBallHistoryRepository;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import java.util.Objects;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final FinBallHistoryRepository finBallHistoryRepository;
    private final FinBallAccountRepository finBallAccountRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    private final Long FIN_BALL_CODE = 106L;

    public void send(AccountTransferDto.Request request, Member member)
            throws JsonProcessingException {
        init(request);
        List<FinBallTradeHistoryDto> historyDtoList = getMyDataResponse(request,
                member.getUserId());
        save(historyDtoList);
    }

    public void init(AccountTransferDto.Request request) {
        TransferInfoDto minus = request.getMinusBank();
        TransferInfoDto plus = request.getPlusBank();

        if (Objects.equals(minus.getCompanyId(), FIN_BALL_CODE)) {
            request.getMinusBank().setBalance(getAccountBalance(minus));
        }

        if (Objects.equals(plus.getCompanyId(), FIN_BALL_CODE)) {
            request.getPlusBank().setBalance(getAccountBalance(plus));
        }
    }

    public Long getAccountBalance(TransferInfoDto info) {
        FinBallAccount finBallAccount = finBallAccountRepository.findById(info.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당되는 계좌가 존재하지 않습니다."));

        return finBallAccount.getBalance();
    }

    public List<FinBallTradeHistoryDto> getMyDataResponse(Request request, String memberId)
            throws JsonProcessingException {
        String token = redisUtil.getMyDataToken(memberId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                request, "/my-data/transfer",
                HttpMethod.POST);

        RestDto<FinBallTradeHistoryDto> restDto = new RestDto<>(FinBallTradeHistoryDto.class,
                response);

        return (List<FinBallTradeHistoryDto>) restTemplateUtil.parseListBody(
                restDto, "list");
    }

    @Transactional
    public void save(List<FinBallTradeHistoryDto> historyDtoList) {
        for (FinBallTradeHistoryDto historyDto : historyDtoList) {
            FinBallAccount finBallAccount = finBallAccountRepository.findById(
                            historyDto.getAccountNo())
                    .orElseThrow(() -> new IllegalArgumentException("해당하는 계좌가 없습니다."));

            finBallAccount.setBalance(historyDto.getRemain());
            finBallAccountRepository.save(finBallAccount);
            finBallHistoryRepository.save(historyDto.toFinBallHistory(finBallAccount));
        }
    }
}
