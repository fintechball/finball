package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.company.CompanyCodeDto;
import com.example.backend.dto.groupaccount.AcceptGroupAccountDto;
import com.example.backend.dto.groupaccount.DeleteGroupAccountDto;
import com.example.backend.dto.groupaccount.GameEndDto;
import com.example.backend.dto.groupaccount.GroupAccountDto;
import com.example.backend.dto.groupaccount.GroupMemberDto;
import com.example.backend.dto.groupaccount.GroupTradeHistoryDto;
import com.example.backend.dto.groupaccount.RegistGroupAccountDto.Request;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.dto.transfer.TransferInfoDto;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountHistory;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.GroupGameResult;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.groupaccount.GroupAccountCustomRepository;
import com.example.backend.repository.groupaccount.GroupAccountRepository;
import com.example.backend.repository.groupaccounthistory.GroupAccountHistoryRepository;
import com.example.backend.repository.groupaccountmember.GroupAccountMemberCustomRepository;
import com.example.backend.repository.groupaccountmember.GroupAccountMemberRepository;
import com.example.backend.repository.groupgameresult.GroupGameResultRepository;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GroupAccountService {

    private final GroupAccountRepository groupAccountRepository;
    private final GroupAccountCustomRepository groupAccountCustomRepository;
    private final GroupAccountMemberCustomRepository groupAccountMemberCustomRepository;
    private final GroupAccountMemberRepository groupAccountMemberRepository;
    private final GroupAccountHistoryRepository groupAccountHistoryRepository;
    private final GroupGameResultRepository groupGameResultRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public String save(Request request, Member member) {
        GroupAccount groupAccount = request.toGroupAccount(member);
        GroupAccount savedGroupAccount = groupAccountRepository.save(groupAccount);
        GroupAccountMember groupAccountMember = request.toGroupAccountMember(member, groupAccount);
        groupAccountMemberRepository.save(groupAccountMember);
        return savedGroupAccount.getAccountNo();
    }

    public AcceptGroupAccountDto.Response acceptInvite(
            AcceptGroupAccountDto.Request request, Member member) {
        String groupAccountNo = request.getGroupAccountNo();
        GroupAccount groupAccount = groupAccountRepository.findById(groupAccountNo).get();
        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }
        if (groupAccount.isValid() == false) {
            throw new CustomException(ErrorCode.ACCOUNT_NOT_VALID);
        }
        GroupAccountMember groupAccountMember = request.toGroupAccountMember(member, groupAccount);
        groupAccountMemberRepository.save(groupAccountMember);
        return AcceptGroupAccountDto.Response.toAcceptGroupAccountDtoResponse(groupAccount);
    }

    public GroupAccountDto.Response findByGroupAccountId(String groupAccountNo) {
        GroupAccount groupAccount = (GroupAccount) groupAccountCustomRepository.getGroupAccountWithMembers(
                groupAccountNo);
        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }
        if (groupAccount.isValid() == false) {
            throw new CustomException(ErrorCode.ACCOUNT_NOT_VALID);
        }
        long hostId = groupAccount.getMember().getId();
        List<GroupMemberDto> groupAccountMemberList = groupAccountCustomRepository.getGroupAccountMemberListWithMembers(
                        groupAccountNo).stream()
                .map(groupAccountMember -> groupAccountMember.toGroupMemberDto(hostId))
                .collect(
                        Collectors.toList());
        List<GroupTradeHistoryDto> groupAccountHistoryList = groupAccountCustomRepository.getGroupAccountHistoryListWithGameResult(
                groupAccountNo).stream().map(GroupAccountHistory::toGroupTradeHistoryDto).collect(
                Collectors.toList());

        return GroupAccountDto.Response.toGroupAccountDto(groupAccount, groupAccountMemberList,
                groupAccountHistoryList);
    }

    public void endGame(GameEndDto.Request request) {
        Long getGroupAccountHistoryId = request.getGroupAccountHistoryId();
        GroupAccountHistory groupAccountHistory = groupAccountHistoryRepository.findById(
                getGroupAccountHistoryId).get();

        if (groupAccountHistory == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_HISTORY_NOT_FOUND);
        }

        HashMap<Long, Long> gameResult = request.getGameResult();

        gameResult.forEach((groupMemberId, lose) -> {
            GroupAccountMember groupAccountMember = groupAccountMemberRepository.findById(
                    groupMemberId).get();
            if (groupAccountMember == null) {
                throw new CustomException(ErrorCode.GROUP_ACCOUNT_MEMBER_NOT_FOUND);
            }

            groupAccountMember.setBalance(groupAccountMember.getBalance() - lose);

            GroupGameResult groupGameResult = GroupGameResult.builder()
                    .groupAccountHistory(groupAccountHistory)
                    .groupAccountMember(groupAccountMember)
                    .lose(lose)
                    .build();

            groupGameResultRepository.save(groupGameResult);
        });
    }

    public void delete(DeleteGroupAccountDto.Request request, Member member)
            throws JsonProcessingException {
        String memberId = member.getUserId();
        String groupAccountNo = request.getGroupAccountNo();
        Long finballCode = (long) 106;

        GroupAccount groupAccount = groupAccountRepository.findById(groupAccountNo).get();

        // 송금하는 모임 통장
        TransferInfoDto minusBank = buildTransferInfoDto(finballCode,
                groupAccount.getAccountNo(), groupAccount.getName());

        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }

        if (groupAccount.isValid() == false) {
            throw new CustomException(ErrorCode.ACCOUNT_NOT_VALID);
        }

        List<GroupAccountMember> groupAccountMemberList = groupAccountMemberCustomRepository.getGroupAccountMemberWithMembers(
                groupAccountNo);

        for (GroupAccountMember groupAccountMember : groupAccountMemberList
        ) {
            if (groupAccountMember.getBalance() != 0) {
                // 회사 코드 가져오기
                String bankName = groupAccountMember.getBankName();
                String token = redisUtil.getMyDataToken(memberId);
                Long cpCode = getCode(token, request, bankName);

                String toAccountNo = groupAccountMember.getToAccountNo();
                String toName = groupAccountMember.getMember().getName();
                long balance = groupAccountMember.getBalance();

                TransferInfoDto plusBank = buildTransferInfoDto(cpCode, toAccountNo, toName);

                AccountTransferDto.Request sendRequest = buildTransferDto(minusBank, plusBank,
                        balance);

                ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                        sendRequest, "/myData/transfer",
                        HttpMethod.POST);
            }
        }
        groupAccount.setValid(false);
        groupAccountRepository.save(groupAccount);
    }

    private Long getCode(String token, DeleteGroupAccountDto.Request request, String bankName)
            throws JsonProcessingException {
        ResponseEntity<String> codeResponse = restTemplateUtil.callMyData(token,
                request, "/myData/company/name/" + bankName,
                HttpMethod.GET);

        RestDto<CompanyCodeDto> codeRestDto = new RestDto<>(CompanyCodeDto.class,
                codeResponse);
        CompanyCodeDto companyCodeDto = (CompanyCodeDto) restTemplateUtil.parseBody(
                codeRestDto, "cpCode");

        return companyCodeDto.getCpCode();
    }

    private TransferInfoDto buildTransferInfoDto(Long code, String accountNo, String target) {
        return TransferInfoDto.builder()
                .code(code)
                .accountNumber(accountNo)
                .target(target)
                .build();
    }

    private AccountTransferDto.Request buildTransferDto(TransferInfoDto minusBank,
            TransferInfoDto plusBank, Long value) {
        return AccountTransferDto.Request.builder()
                .minusBank(minusBank)
                .plusBank(plusBank)
                .value(value)
                .build();
    }
}
