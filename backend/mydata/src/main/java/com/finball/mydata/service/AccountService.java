package com.finball.mydata.service;

import com.finball.mydata.dto.account.RegistAccountDto;
import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import com.finball.mydata.repository.AccountRepository;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.repository.MemberRepository;
import com.finball.mydata.util.RandomAccount;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final RandomAccount randomAccount;

    public void createAccount(Long id) throws IOException, ParseException {
        Member member = memberRepository.findById(id).get();
        RegistAccountDto registAccountDto = randomAccount.create();

        Long companyId = registAccountDto.getCompanyId();
        Company company = companyRepository.findById(companyId).get();
        Account account = registAccountDto.toAccount(member, company);

        accountRepository.save(account);
    }
}
