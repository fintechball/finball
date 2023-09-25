package com.example.backend.service;

import com.example.backend.dto.RestDto;
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
import com.example.backend.repository.groupaccount.GroupAccountRepository;
import com.example.backend.repository.groupaccounthistory.GroupAccountHistoryRepository;
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
public class GroupAccountTransferService {

    private final Long FIN_BALL_CODE = 106L;

    private final GroupAccountRepository groupAccountRepository;
    private final FinBallAccountRepository finBallAccountRepository;
    private final FinBallHistoryRepository finBallHistoryRepository;

    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    private final GroupAccountHistoryRepository groupAccountHistoryRepository;

    public void transferGroupAccount(AccountTransferDto.Request request, Member member)
            throws JsonProcessingException {

        GroupAccount groupAccount = getGroupAccount(request, member);

        if (balanceCheck(request, groupAccount)) {
            init(request, groupAccount);
            List<FinBallTradeHistoryDto> historyDtoList = getMyDataResponse(request,
                    member.getUserId());
            save(historyDtoList, request.getMinusBank().getAccountNo());
        }
    }

    public void init(Request request, GroupAccount groupAccount) {
        TransferInfoDto plus = request.getPlusBank();
        TransferInfoDto minus = request.getMinusBank();

        minus.setCompanyId(FIN_BALL_CODE);
        minus.setUserName(groupAccount.getName());
        minus.setBalance(groupAccount.getBalance());

        if (Objects.equals(plus.getCompanyId(), FIN_BALL_CODE)) { // 상대방이 핀볼 은행이라면
            request.getPlusBank().setBalance(getAccountBalance(plus));
        }
    }

    public Long getAccountBalance(TransferInfoDto info) {
        FinBallAccount finBallAccount = finBallAccountRepository.findById(info.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당되는 계좌가 존재하지 않습니다."));

        return finBallAccount.getBalance();
    }

    private boolean balanceCheck(AccountTransferDto.Request request, GroupAccount groupAccount) {

        if (request.getValue() <= groupAccount.getBalance()) {
            return true; //보낼 돈이 있다면 보냄
        }

        throw new CustomException(ErrorCode.OUT_OF_RANGE);
    }

    private GroupAccount getGroupAccount(AccountTransferDto.Request request, Member member) {

        // 요청한 그룹 계좌가 있는지 조회
        GroupAccount groupAccount = groupAccountRepository.findById(
                request.getMinusBank().getAccountNo()).orElseThrow(
                () -> new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND)
        );

        // 실제 주인이 요청을 보냈는지 조회
        if (groupAccount.getMember().getId() != member.getId()) {
            throw new CustomException(ErrorCode.OWNER_NOT_CORRESPOND);
        }
        return groupAccount;
    }

    public List<FinBallTradeHistoryDto> getMyDataResponse(AccountTransferDto.Request request,
            String memberId)
            throws JsonProcessingException {

        String token = redisUtil.getMyDataToken(memberId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                request, "/myData/transfer",
                HttpMethod.POST);

        RestDto<FinBallTradeHistoryDto> restDto = new RestDto<>(FinBallTradeHistoryDto.class,
                response);

        return (List<FinBallTradeHistoryDto>) restTemplateUtil.parseListBody(
                restDto, "list");
    }

    @Transactional
    public void save(List<FinBallTradeHistoryDto> historyDtoList, String groupAccountNumber) {

        for (FinBallTradeHistoryDto historyDto : historyDtoList) {

            // minusBank 처리 => 그룹 계좌는 출금
            if (historyDto.getAccountNo().equals(groupAccountNumber)) {
                saveGroupAccount(historyDto);
            } else {// plusBank 처리 => 핀볼 계좌는 입금
                saveFinBallAccount(historyDto);
            }
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

    @Transactional
    public void saveGroupAccount(FinBallTradeHistoryDto historyDto) {

        GroupAccount groupAccount = groupAccountRepository.findById(
                        historyDto.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 계좌가 없습니다."));

        groupAccount.setBalance(historyDto.getRemain());
        groupAccountRepository.save(groupAccount);
        groupAccountHistoryRepository.save(historyDto.toGroupAccountHistory(groupAccount));
    }
}
