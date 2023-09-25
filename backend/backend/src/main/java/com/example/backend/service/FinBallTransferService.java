package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.finball.ReadFinBallHistoryDto;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.dto.transfer.AccountTransferDto.Request;
import com.example.backend.dto.transfer.FinBallTradeHistoryDto;
import com.example.backend.dto.transfer.TransferInfoDto;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
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
public class FinBallTransferService {

    private final Long FIN_BALL_CODE = 106L;

    private final FinBallAccountRepository finBallAccountRepository;
    private final FinBallHistoryRepository finBallHistoryRepository;
    private final FinBallService finBallService;

    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public ReadFinBallHistoryDto.Response transferFinBallAccount(AccountTransferDto.Request request,
            Member member)
            throws JsonProcessingException {

        FinBallAccount finBallAccount = getAccount(request, member);

        if (balanceCheck(request, finBallAccount)) {
            init(request, finBallAccount);
            //이 부분부터 다시 봐야함
            List<FinBallTradeHistoryDto> historyDtoList = getMyDataResponse(request,
                    member.getUserId());
            save(historyDtoList, request.getMinusBank().getAccountNo());
        }

        return finBallService.readFinBallHistoryList(member);
    }

    public void init(Request request, FinBallAccount finBallAccount) {
        TransferInfoDto plus = request.getPlusBank();
        TransferInfoDto minus = request.getMinusBank();

        minus.setCompanyId(FIN_BALL_CODE);
        minus.setUserName(finBallAccount.getMember().getName());
        minus.setBalance(finBallAccount.getBalance());

        if (Objects.equals(plus.getCompanyId(), FIN_BALL_CODE)) { // 상대방이 핀볼 은행이라면
            request.getPlusBank().setBalance(getAccountBalance(plus));
        }
    }

    public Long getAccountBalance(TransferInfoDto info) {
        FinBallAccount finBallAccount = finBallAccountRepository.findById(info.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당되는 계좌가 존재하지 않습니다."));

        return finBallAccount.getBalance();
    }

    private boolean balanceCheck(AccountTransferDto.Request request,
            FinBallAccount finBallAccount) {

        if (request.getValue() <= finBallAccount.getBalance()) {
            return true; //보낼 돈이 있다면 보냄
        }

        throw new CustomException(ErrorCode.OUT_OF_RANGE);
    }

    private FinBallAccount getAccount(AccountTransferDto.Request request, Member member) {

        // 요청한 그룹 계좌가 있는지 조회
        FinBallAccount finBallAccount = finBallAccountRepository.findById(
                request.getMinusBank().getAccountNo()).orElseThrow(
                () -> new CustomException(ErrorCode.DATA_NOT_FOUND)
        );

        return finBallAccount;
    }

    public List<FinBallTradeHistoryDto> getMyDataResponse(AccountTransferDto.Request request,
            String memberId)
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
    public void save(List<FinBallTradeHistoryDto> historyDtoList, String minusAccountNumber) {

        for (FinBallTradeHistoryDto historyDto : historyDtoList) {
            saveFinBallAccount(historyDto);
        }
    }

    @Transactional
    public void saveFinBallAccount(FinBallTradeHistoryDto historyDto) {

        FinBallAccount finBallAccount = finBallAccountRepository.findById(
                        historyDto.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 계좌가 없습니다."));

        finBallAccount.setBalance(historyDto.getRemain());
        finBallAccountRepository.save(finBallAccount);
        finBallHistoryRepository.save(historyDto.toFinBallHistory(finBallAccount));
    }
}

