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

        List<MemberAccountInfoDto> memberAccountInfoDtoList = getMydataAccount(accountNumberList, member.getUserId());

        addIsFavorite(accountList, memberAccountInfoDtoList);
        Long sum = sumBalance(memberAccountInfoDtoList);

        return new GetUserAccountDto.Response(memberAccountInfoDtoList, sum);
    }

    public List<MemberAccountInfoDto> getMydataAccount(List<String> accountNumberList, String memberId)
            throws JsonProcessingException {
        String token = redisUtil.getMyDataToken(memberId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                new GetMemberAccountDto.Request(accountNumberList), "/my-data/member/account",
                HttpMethod.POST);
        RestDto<MemberAccountInfoDto> restDto = new RestDto<>(MemberAccountInfoDto.class, response);

        return (List<MemberAccountInfoDto>) restTemplateUtil.parseListBody(
                restDto, "memberAccountList");
    }

    public void addIsFavorite(List<Account> accountList, List<MemberAccountInfoDto> restResponseList) {
        for(MemberAccountInfoDto response : restResponseList) {
            for(Account account : accountList) {
                if(response.getAccountNo().equals(account.getAccountNumber())){
                    response.setIsFavorite(account.isFavorite());
                }
            }
        }
    }

    public Long sumBalance(List<MemberAccountInfoDto> restResponseList){
        Long sum = 0L;
        for(MemberAccountInfoDto response : restResponseList) {
            sum += response.getBalance();
        }

        return sum;
    }
}
