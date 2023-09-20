package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.account.AccountRegisterDto;
import com.example.backend.dto.account.AccountRegisterInfoDto;
import com.example.backend.dto.account.GetUserAccountDto;
import com.example.backend.dto.mydata.GetMemberAccountDto;
import com.example.backend.dto.mydata.MemberAccountInfoDto;
import com.example.backend.entity.Account;
import com.example.backend.entity.Member;
import com.example.backend.repository.account.AccountCustomRepository;
import com.example.backend.repository.account.AccountRepository;
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
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountCustomRepository accountCustomRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public void register(AccountRegisterDto.Request request, Member member) {

        for (AccountRegisterInfoDto info : request.getBankAccountDtoList()) {
            accountRepository.save(info.toAccount(member));
        }
    }

    public GetUserAccountDto.Response getAccountList(Member member) throws JsonProcessingException {
        List<Account> accountList = accountCustomRepository.findByIdOrderByIsFavorite(
                member.getId());
        List<String> accountNumberList = new ArrayList<>();

        for (Account account : accountList) {
            accountNumberList.add(account.getAccountNumber());
        }

        String token = redisUtil.getMyDataToken(member.getUserId());

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                new GetMemberAccountDto.Request(accountNumberList), "/my-data/member/account",
                HttpMethod.POST);
        RestDto<MemberAccountInfoDto> restDto = new RestDto<>(MemberAccountInfoDto.class, response);

        List<MemberAccountInfoDto> memberAccountInfoDtoList = (List<MemberAccountInfoDto>) restTemplateUtil.parseListBody(
                restDto, "memberAccountList");

        System.out.println(memberAccountInfoDtoList);
        return new GetUserAccountDto.Response(null);
    }
}
