package com.finball.mydata.service;

import com.finball.mydata.dto.account.AccountTransferDto;
import com.finball.mydata.dto.account.AccountTransferDto.Request;
import com.finball.mydata.dto.account.BankAccountDto;
import com.finball.mydata.dto.account.BankAccountListDto;
import com.finball.mydata.dto.account.GetMemberAccountDto;
import com.finball.mydata.dto.account.GetMemberAccountDto.Response;
import com.finball.mydata.dto.account.MemberAccountInfoDto;
import com.finball.mydata.dto.account.RegistAccountDto;
import com.finball.mydata.dto.account.TransferInfoDto;
import com.finball.mydata.dto.tradeHistory.AccountHistoryDto;
import com.finball.mydata.dto.tradeHistory.FinBallTradeHistoryDto;
import com.finball.mydata.dto.tradeHistory.FinBallTradeHistoryListDto;
import com.finball.mydata.dto.tradeHistory.OppositeBankDto;
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
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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
    private final static int FINBALL_ACCOUNT_CODE = 106;

    public BankAccountListDto.Response getBankAccountList(Long id,
            BankAccountListDto.Request request) {

        List<Long> bankCodeList = request.getBankCodeList();
        List<Account> accountList = accountCustomRepository
                .findAllByMemberIdAndCompanyIdInWithFetchJoin(
                        id,
                        bankCodeList);
        List<BankAccountDto> bankAccountDtoList = accountList
                .stream().map(Account::toAccountDto).collect(Collectors.toList());

        return BankAccountListDto.Response.builder()
                .bankAccountList(bankAccountDtoList).build();
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

        List<FinBallTradeHistoryDto> finBallTradeHistoryDtoList = new ArrayList<>();

        TransferInfoDto plusBank = request.getPlusBank();
        TransferInfoDto minusBank = request.getMinusBank();

        // 계좌번호에 맞는 계좌가 있는지 확인
        Account minusAccount = getAccount(minusBank);
        Account plusAccount = getAccount(plusBank);

        // 출금
        doWithdrawal(request, minusAccount, finBallTradeHistoryDtoList);
        // 입금
        doDeposit(request, plusAccount, finBallTradeHistoryDtoList);

        AccountTransferDto.Response response = new AccountTransferDto.Response(finBallTradeHistoryDtoList);

        return response;
    }

    private void doDeposit(Request request, Account plusAccount,
            List<FinBallTradeHistoryDto> finBallTradeHistoryDtoList) {

        Long cpCode = request.getMinusBank().getCode();
        Company company = companyRepository.findByCpCodeAndCpType(cpCode, CompanyType.은행사);

        if (plusAccount == null) {
            OppositeBankDto oppositeBankDto = request.toOppositeBankDto(company.getCpName(), request.getMinusBank());
            FinBallTradeHistoryDto finBallTradeHistoryDto = request.toFinBallTradeHistoryDto(request.getPlusBank(), oppositeBankDto, DealType.입금, request.getMinusBank().getBalance() + request.getValue());
            finBallTradeHistoryDtoList.add(finBallTradeHistoryDto);
        } else {
            TradeHistory tradeHistory = request.toTradeHistory(plusAccount, company, DealType.입금);
            tradeHistoryRepository.save(tradeHistory);
            // 계좌갱신
            Long value = request.getValue();
            plusAccount.setBalance(plusAccount.getBalance() + value);
        }

    }

    private void doWithdrawal(Request request, Account minusAccount,
            List<FinBallTradeHistoryDto> finBallTradeHistoryDtoList) {

        Long cpCode = request.getPlusBank().getCode();
        Company company = companyRepository.findByCpCodeAndCpType(cpCode, CompanyType.은행사);

        if (minusAccount == null) {
            OppositeBankDto oppositeBankDto = request.toOppositeBankDto(company.getCpName(), request.getPlusBank());
            FinBallTradeHistoryDto finBallTradeHistoryDto = request.toFinBallTradeHistoryDto(request.getMinusBank(), oppositeBankDto, DealType.출금, request.getMinusBank().getBalance() - request.getValue());
            finBallTradeHistoryDtoList.add(finBallTradeHistoryDto);

        } else {
            TradeHistory tradeHistory = request.toTradeHistory(minusAccount, company, DealType.출금);
            tradeHistoryRepository.save(tradeHistory);
            // 계좌갱신
            Long value = request.getValue();
            minusAccount.setBalance(minusAccount.getBalance() - value);
        }
    }

    public Account getAccount(TransferInfoDto account) {

        if (account.getCode() == FINBALL_ACCOUNT_CODE) {
            return null;
        }

        List<Account> accountList = accountCustomRepository
                .findByAccountNo(account.getAccountNumber());

        if (accountList.size() == 0) {
            throw new NoSuchElementException("해당 계좌는 존재하지 않습니다.");
        }
        return accountList.get(0);
    }

    public Response getMemberAccount(List<String> accountNumberList, Member member) {
        List<Account> accountList = accountCustomRepository.findByAccountNo(accountNumberList, member.getId());
        List<MemberAccountInfoDto> list = new ArrayList<>();

        for(Account account : accountList) {
            list.add(MemberAccountInfoDto.parseDto(account));
        }

        GetMemberAccountDto.Response response = new GetMemberAccountDto.Response(list);
        return response;
    }
}
