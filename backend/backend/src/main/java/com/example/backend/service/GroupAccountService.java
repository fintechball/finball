package com.example.backend.service;

import com.example.backend.dto.Response;
import com.example.backend.dto.groupaccount.RegistGroupAccountDto.Request;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.Member;
import com.example.backend.repository.groupaccount.GroupAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class GroupAccountService {

    private final GroupAccountRepository groupAccountRepository;

    public String save(Request request, Member member) {
        GroupAccount groupAccount = request.toGroupAccount(member);
        GroupAccount savedGroupAccount = groupAccountRepository.save(groupAccount);
        return savedGroupAccount.getAccountNumber();
    }
}
