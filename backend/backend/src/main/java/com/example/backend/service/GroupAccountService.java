package com.example.backend.service;

import com.example.backend.dto.groupaccount.AcceptGroupAccountDto;
import com.example.backend.dto.groupaccount.GroupAccountDto;
import com.example.backend.dto.groupaccount.RegistGroupAccountDto.Request;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.groupaccount.GroupAccountRepository;
import com.example.backend.repository.groupaccountmember.GroupAccountMemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GroupAccountService {

    private final GroupAccountRepository groupAccountRepository;
    private final GroupAccountMemberRepository groupAccountMemberRepository;

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
        GroupAccount groupAccount = groupAccountRepository.findById(groupAccountId).get();
        if (groupAccount == null) {
            throw new CustomException(ErrorCode.GROUP_ACCOUNT_NOT_FOUND);
        }
        String name = groupAccount.getName();
        String accountNumber = groupAccount.getAccountNumber();
        List<GroupAccountMember> groupAccountMemberList = groupAccountMemberRepository.findAllByGroupAccountAccountNumber(
                groupAccountId);

        return null;
    }
}
