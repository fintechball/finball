package com.example.backend.service;

import com.example.backend.dto.groupaccount.AcceptGroupAccountDto;
import com.example.backend.dto.groupaccount.GroupAccountDto;
import com.example.backend.dto.groupaccount.GroupMemberDto;
import com.example.backend.dto.groupaccount.RegistGroupAccountDto.Request;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountHistory;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.groupaccount.GroupAccountCustomRepository;
import com.example.backend.repository.groupaccount.GroupAccountRepository;
import com.example.backend.repository.groupaccounthistory.GroupAccountHistoryRepository;
import com.example.backend.repository.groupaccountmember.GroupAccountMemberRepository;
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

    public GroupAccountDto findByGroupAccountId(String groupAccountId) {
        GroupAccount groupAccount = (GroupAccount) groupAccountCustomRepository.getGroupAccountWithMembers(
                groupAccountId);
        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }
        long hostId = groupAccount.getMember().getId();
        String name = groupAccount.getName();
        String accountNumber = groupAccount.getAccountNumber();
        long totalSum = groupAccount.getBalance();
        List<GroupMemberDto> groupAccountMemberList = groupAccountCustomRepository.getGroupAccountMemberListWithMembers(
                        groupAccountId).stream()
                .map(groupAccountMember -> groupAccountMember.toGroupMemberDto(hostId, totalSum))
                .collect(
                        Collectors.toList());
        System.out.println(groupAccountMemberList.toString());

        List<GroupAccountHistory> groupAccountHistoryList = groupAccountCustomRepository.getGroupAccountHistoryListWithGameResult(
                groupAccountId);
        System.out.println(groupAccountHistoryList);

        return null;
    }
}
