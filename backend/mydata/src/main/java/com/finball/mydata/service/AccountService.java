package com.finball.mydata.service;

import com.finball.mydata.dto.account.AccountDto;
import com.finball.mydata.dto.account.GetAccountsDto;
import com.finball.mydata.dto.account.GetAccountsDto.Request;
import com.finball.mydata.dto.account.GetAccountsDto.Response;
import com.finball.mydata.entity.Account;
import com.finball.mydata.repository.AccountRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public GetAccountsDto.Response getAccounts(Long id, Request request) {
        List<Long> bankList = request.getBankList();
        List<AccountDto> accountList = accountRepository.findAllByMemberIdAndCompanyIdIn(id,
                        bankList)
                .stream().map(Account::toDto).collect(Collectors.toList());
        return GetAccountsDto.Response.builder()
                .userAccountList(accountList).build();
    }
}
