package com.finball.mydata.service;

import com.finball.mydata.dto.account.AccountDto;
import com.finball.mydata.dto.account.AccountTransferDto;
import com.finball.mydata.dto.account.AccountTransferDto.Request;
import com.finball.mydata.dto.account.GetAccountsDto;
import com.finball.mydata.dto.account.RegistAccountDto;
import com.finball.mydata.dto.account.TransferInfoDto;
import com.finball.mydata.dto.account.TransferResponseDto;
import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import com.finball.mydata.entity.TradeHistory;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.repository.MemberRepository;
import com.finball.mydata.repository.TradeHistoryRepository;
import com.finball.mydata.repository.account.AccountCustomRepository;
import com.finball.mydata.repository.account.AccountRepository;
import com.finball.mydata.type.DealType;
import com.finball.mydata.util.RandomAccount;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountCustomRepository accountCustomRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final TradeHistoryRepository tradeHistoryRepository;
    private final RandomAccount randomAccount;
    private final static int FINBALL_ACCOUNT_CODE = -1;

    public GetAccountsDto.Response getAccounts(Member member, GetAccountsDto.Request request) {
        long memberId = member.getId();

        System.out.println(request);

        List<Long> bankList = request.getBankCode();
        List<Account> accountList = accountCustomRepository.findAllByMemberIdAndCompanyIdInWithFetchJoin(
                memberId,
                bankList);
        List<AccountDto> accountDtoList = accountList
                .stream().map(Account::toAccountDto).collect(Collectors.toList());

        return GetAccountsDto.Response.builder()
                .userAccountList(accountDtoList).build();
    }

    public void createAccount(Long id) throws IOException, ParseException {
        Member member = memberRepository.findById(id).get();
        RegistAccountDto registAccountDto = randomAccount.create();

        Long companyId = registAccountDto.getCompanyId();
        Company company = companyRepository.findById(companyId).get();
        Account account = registAccountDto.toAccount(member, company);

        accountRepository.save(account);
    }

    @Transactional
    public AccountTransferDto.Response accountTransfer(Request request) {

        List<TransferResponseDto> responseList = new ArrayList<>();
        TransferInfoDto plusBank = request.getPlusBank();
        TransferInfoDto minusBank = request.getMinusBank();
        Long value = request.getValue();

        List<Account> minusAccountList = accountCustomRepository
                .findByAccountNo(minusBank.getAccountNumber());
        List<Account> plusAccountList = accountCustomRepository
                .findByAccountNo(plusBank.getAccountNumber());

        Account minusAccount = getAccount(minusAccountList);
        Account plusAccount = getAccount(plusAccountList);

        doTransfer(request, minusBank, minusAccount, plusAccount, value, DealType.출금, responseList);
        doTransfer(request, plusBank, plusAccount, minusAccount, value, DealType.입금, responseList);

        AccountTransferDto.Response response = new AccountTransferDto.Response(responseList);

        return response;
    }

    public Account getAccount(List<Account> accountList) {
        if (accountList.size() == 0) {
            return null;
        }
        return accountList.get(0);
    }

    public void doTransfer(AccountTransferDto.Request request, TransferInfoDto transferInfo,
            Account affected,
            Account affecting,
            Long value, DealType type, List<TransferResponseDto> responseList) {

        if (transferInfo.getCode() == FINBALL_ACCOUNT_CODE) {
            responseList.add(new TransferResponseDto(transferInfo.getAccountNumber(), type));
            return;
        }

        // 거래 목록 추가
        Company company = companyRepository.findByCpCode(transferInfo.getCode());

        TradeHistory tradeHistory = null;
        if (affecting == null) {
            tradeHistory = request.toTradeHistoryNoOpAccount(affected, affecting, company,
                    type);
        } else {
            tradeHistory = request.toTradeHistory(affected, affecting, company,
                    type);
        }

        tradeHistoryRepository.save(tradeHistory);

        // 계좌에 반영
        if (type == DealType.출금) {
            affected.setBalance(affected.getBalance() - value);
        } else {
            affected.setBalance(affected.getBalance() + value);
        }
    }
}
