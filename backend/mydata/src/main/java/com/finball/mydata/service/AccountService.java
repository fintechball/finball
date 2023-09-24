package com.finball.mydata.service;

import com.finball.mydata.dto.account.*;
import com.finball.mydata.dto.account.AccountTransferDto.Request;
import com.finball.mydata.dto.account.GetMemberAccountDto.Response;
import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.OppositeDto;
import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.repository.MemberRepository;
import com.finball.mydata.repository.TradeHistoryRepository;
import com.finball.mydata.repository.account.AccountCustomRepository;
import com.finball.mydata.repository.account.AccountRepository;
import com.finball.mydata.type.CompanyType;
import com.finball.mydata.type.DealType;
import com.finball.mydata.util.RandomAccount;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountCustomRepository accountCustomRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final TradeHistoryRepository tradeHistoryRepository;
    private final RandomAccount randomAccount;
    private final static int FINBALL_ACCOUNT_CODE = 106;

    //Done
    public BankAccountListDto.Response getBankAccountList(Long id,
                                                          BankAccountListDto.Request request) {

        List<Long> bankCodeList = request.getBankCodeList();
        List<Account> accountList = accountCustomRepository
                .findAllByMemberIdAndCompanyIdInWithFetchJoin(
                        id,
                        bankCodeList);
        List<BankAccountDto> bankAccountDtoList = accountList
                .stream().map(Account::toBankAccountDto).collect(Collectors.toList());

        return BankAccountListDto.Response.builder()
                .bankAccountDtoList(bankAccountDtoList).build();
    }

    public void createAccount(Long id) throws IOException, ParseException {
        Member member = memberRepository.findById(id).get();
        RegistAccountDto registAccountDto = randomAccount.create();

        Long companyId = registAccountDto.getCompanyId();
        Company company = companyRepository.findById(companyId).get();
        Account account = registAccountDto.toAccount(member, company);
        System.out.println(account.getCompany().getCode());
        accountRepository.save(account);
    }

    @Transactional
    public AccountTransferDto.Response accountTransfer(Request request) {

        List<AccountHistoryDto> accountHistoryDtoList = new ArrayList<>();

        TransferInfoDto plusBank = request.getPlusBank();
        TransferInfoDto minusBank = request.getMinusBank();

        // 계좌번호에 맞는 계좌가 있는지 확인
        Account minusAccount = getAccount(minusBank);
        Account plusAccount = getAccount(plusBank);

        // 출금
        doWithdrawal(request, minusAccount, accountHistoryDtoList);
        // 입금
        doDeposit(request, plusAccount, accountHistoryDtoList);

        AccountTransferDto.Response response = new AccountTransferDto.Response(accountHistoryDtoList);

        return response;
    }

    private void doDeposit(Request request, Account plusAccount,
                           List<AccountHistoryDto> accountHistoryDtoList) {

        Long companyId = request.getMinusBank().getCompanyId();
        Company company = companyRepository.findByCodeAndCpType(companyId, CompanyType.은행사);

        if (plusAccount == null) {
            OppositeDto oppositeDto = request.toOppositeDto(company, request.getMinusBank());
            AccountHistoryDto accountHistoryDto = request.toAccountHistoryDto(request.getPlusBank(), oppositeDto, DealType.입금, request.getPlusBank().getBalance() + request.getValue());
            accountHistoryDtoList.add(accountHistoryDto);
        } else {
            TradeHistory tradeHistory = request.toTradeHistory(plusAccount, company, DealType.입금);
            tradeHistoryRepository.save(tradeHistory);
            // 계좌갱신
            Long value = request.getValue();
            plusAccount.setBalance(plusAccount.getBalance() + value);
        }

    }

    private void doWithdrawal(Request request, Account minusAccount,
                              List<AccountHistoryDto> accountHistoryDtoList) {

        Long companyId = request.getPlusBank().getCompanyId();
        Company company = companyRepository.findByCodeAndCpType(companyId, CompanyType.은행사);

        if (minusAccount == null) {
            OppositeDto oppositeDto = request.toOppositeDto(company, request.getPlusBank());
            AccountHistoryDto accountHistoryDto = request.toAccountHistoryDto(request.getMinusBank(), oppositeDto, DealType.출금, request.getMinusBank().getBalance() - request.getValue());
            accountHistoryDtoList.add(accountHistoryDto);

        } else {
            TradeHistory tradeHistory = request.toTradeHistory(minusAccount, company, DealType.출금);
            tradeHistoryRepository.save(tradeHistory);
            // 계좌갱신
            Long value = request.getValue();
            minusAccount.setBalance(minusAccount.getBalance() - value);
        }
    }

    public Account getAccount(TransferInfoDto account) {

        if (account.getCompanyId() == FINBALL_ACCOUNT_CODE) {
            return null;
        }

        List<Account> accountList = accountCustomRepository
                .findByAccountNo(account.getAccountNo());

        if (accountList.size() == 0) {
            throw new NoSuchElementException("해당 계좌는 존재하지 않습니다.");
        }
        return accountList.get(0);
    }

    public Response getMemberAccount(List<String> accountNumberList, Member member) {
        List<Account> accountList = accountCustomRepository.findByAccountNo(accountNumberList, member.getId());
        List<BankAccountDto> list = new ArrayList<>();

        for (Account account : accountList) {
            list.add(account.toBankAccountDto());
        }

        GetMemberAccountDto.Response response = new GetMemberAccountDto.Response(list);
        return response;
    }
}
