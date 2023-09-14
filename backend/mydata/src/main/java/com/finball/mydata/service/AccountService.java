package com.finball.mydata.service;

import com.finball.mydata.dto.account.AccountDto;
import com.finball.mydata.dto.account.AccountTransferDto;
import com.finball.mydata.dto.account.AccountTransferDto.Request;
import com.finball.mydata.dto.account.AccountTransferDto.Response;
import com.finball.mydata.dto.account.TransferInfoDto;
import com.finball.mydata.dto.account.TransferResponseDto;
import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.repository.AccountCustomRepository;
import com.finball.mydata.repository.AccountRepository;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.repository.MemberRepository;
import com.finball.mydata.repository.TradeHistoryRepository;
import com.finball.mydata.type.DealType;
import com.finball.mydata.util.RandomAccount;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final TradeHistoryRepository tradeHistoryRepository;
    private final RandomAccount randomAccount;
    private final AccountCustomRepository accountCustomRepository;

    public void createAccount(Long id) throws IOException, ParseException {
        Member member = memberRepository.findById(id).get();
        AccountDto accountDto = randomAccount.create(member);

        Long companyId = accountDto.getCompanyId();
        Company company = companyRepository.findById(companyId).get();
        Account account = accountDto.toAccount(member, company);

        accountRepository.save(account);
    }

    @Transactional
    public AccountTransferDto.Response accountTransfer(Request request) {

        TransferInfoDto plusBank = request.getPlusBank();
        TransferInfoDto minusBank = request.getMinusBank();
        Long value = request.getValue();

        List<TransferResponseDto> responseList = new ArrayList<>();

        // accountNumber는 고유하기 때문에 get(0)로 처리함
        List<Account> minusAccountList = accountCustomRepository.findByAccountNo(minusBank.getAccountNumber());
        List<Account> plusAccountList = accountCustomRepository.findByAccountNo(plusBank.getAccountNumber());

        Account minusAccount = minusAccountList.size() == 0 ? null : minusAccountList.get(0);
        Account plusAccount = plusAccountList.size() == 0 ? null : plusAccountList.get(0);

        if (minusBank.getCode() == -1) {
            responseList.add(new TransferResponseDto(minusBank.getAccountNumber(), "out"));
        } else {
            // 거래 목록 추가
            Company company = companyRepository.findByCpCode(minusBank.getCode());

            TradeHistory tradeHistory = request.toTradeHistory(minusAccount, plusAccount, company,
                    DealType.출금);
            tradeHistoryRepository.save(tradeHistory);

            // 계좌에 반영
            minusAccount.setBalance(minusAccount.getBalance() - value);
        }

        if (plusBank.getCode() == -1) {
            responseList.add(new TransferResponseDto(plusBank.getAccountNumber(), "in"));
        } else {
            // 거래 목록 추가
            Company company = companyRepository.findByCpCode(plusBank.getCode());

            TradeHistory tradeHistory = request.toTradeHistory(plusAccount, minusAccount, company,
                    DealType.입금);
            tradeHistoryRepository.save(tradeHistory);

            // 계좌에 반영
            plusAccount.setBalance(plusAccount.getBalance() + value);
        }


        AccountTransferDto.Response response = new AccountTransferDto.Response(responseList);

        return response;
    }
}
