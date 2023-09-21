package com.example.backend.service;

import com.example.backend.dto.groupaccount.AcceptGroupAccountDto;
import com.example.backend.dto.groupaccount.GameEndDto;
import com.example.backend.dto.groupaccount.GroupAccountDto;
import com.example.backend.dto.groupaccount.GroupMemberDto;
import com.example.backend.dto.groupaccount.GroupTradeHistoryDto;
import com.example.backend.dto.groupaccount.RegistGroupAccountDto.Request;
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
import com.example.backend.repository.groupaccountmember.GroupAccountMemberRepository;
import com.example.backend.repository.groupgameresult.GroupGameResultRepository;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GroupAccountService {

    private final GroupAccountRepository groupAccountRepository;
    private final GroupAccountCustomRepository groupAccountCustomRepository;
    private final GroupAccountMemberRepository groupAccountMemberRepository;
    private final GroupAccountHistoryRepository groupAccountHistoryRepository;
    private final GroupGameResultRepository groupGameResultRepository;

    public String save(Request request, Member member) {
        GroupAccount groupAccount = request.toGroupAccount(member);
        GroupAccount savedGroupAccount = groupAccountRepository.save(groupAccount);
        GroupAccountMember groupAccountMember = request.toGroupAccountMember(member, groupAccount);
        groupAccountMemberRepository.save(groupAccountMember);
        return savedGroupAccount.getAccountNumber();
    }

    public AcceptGroupAccountDto.Response acceptInvite(
            AcceptGroupAccountDto.Request request, Member member) {
        String groupAccountId = request.getId();
        GroupAccount groupAccount = groupAccountRepository.findById(groupAccountId).get();
        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }
        GroupAccountMember groupAccountMember = request.toGroupAccountMember(member, groupAccount);
        groupAccountMemberRepository.save(groupAccountMember);
        return AcceptGroupAccountDto.Response.builder()
                .accountName(groupAccount.getName())
                .ownerName(groupAccount.getMember().getName())
                .build();
    }

    public GroupAccountDto.Response findByGroupAccountId(String groupAccountId) {
        GroupAccount groupAccount = (GroupAccount) groupAccountCustomRepository.getGroupAccountWithMembers(
                groupAccountId);
        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }
        long hostId = groupAccount.getMember().getId();
        long totalSum = groupAccount.getBalance();
        List<GroupMemberDto> groupAccountMemberList = groupAccountCustomRepository.getGroupAccountMemberListWithMembers(
                        groupAccountId).stream()
                .map(groupAccountMember -> groupAccountMember.toGroupMemberDto(hostId, totalSum))
                .collect(
                        Collectors.toList());
        List<GroupTradeHistoryDto> groupAccountHistoryList = groupAccountCustomRepository.getGroupAccountHistoryListWithGameResult(
                groupAccountId).stream().map(GroupAccountHistory::toGroupTradeHistoryDto).collect(
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
            GroupGameResult groupGameResult = GroupGameResult.builder()
                    .groupAccountHistory(groupAccountHistory)
                    .groupAccountMember(groupAccountMember)
                    .lose(lose)
                    .build();

            groupGameResultRepository.save(groupGameResult);
        });
    }
}
