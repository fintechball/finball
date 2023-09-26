package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.account.*;
import com.example.backend.dto.account.GetBalanceDto.Response;
import com.example.backend.dto.mydata.GetMemberAccountDto;
import com.example.backend.dto.mydata.MemberAccountInfoDto;
import com.example.backend.entity.Account;
import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.account.AccountCustomRepository;
import com.example.backend.repository.account.AccountRepository;
import com.example.backend.repository.finballaccount.FinBallAccountCustomRepository;
import com.example.backend.repository.finballaccount.FinBallAccountRepository;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountCustomRepository accountCustomRepository;
    private final FinBallAccountRepository finBallAccountRepository;
    private final FinBallAccountCustomRepository finBallAccountCustomRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public void register(AccountRegisterDto.Request request, Member member) {

        for (AccountRegisterInfoDto info : request.getBankAccountList()) {
            System.out.println(info.toString());
            accountRepository.save(info.toAccount(member));
        }
    }

    public GetUserAccountDto.Response getAccountList(Member member) throws JsonProcessingException {
        List<Account> accountList = accountCustomRepository.findById(member.getId());
        List<String> accountNumberList = new ArrayList<>();

        for(Account account : accountList) {
            accountNumberList.add(account.getAccountNo());
        }

        System.out.println(accountNumberList.toString());

        List<MemberAccountInfoDto> memberAccountInfoDtoList = getMyDataAccount(accountNumberList, member.getUserId());

        System.out.println(memberAccountInfoDtoList.toString());

        Long sum = sumBalance(memberAccountInfoDtoList);

        return new GetUserAccountDto.Response(memberAccountInfoDtoList, sum);
    }

    public List<MemberAccountInfoDto> getMyDataAccount(List<String> accountNumberList, String memberId)
            throws JsonProcessingException {
        String token = redisUtil.getMyDataToken(memberId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                new GetMemberAccountDto.Request(accountNumberList), "/my-data/member/account",
                HttpMethod.POST);
        RestDto<MemberAccountInfoDto> restDto = new RestDto<>(MemberAccountInfoDto.class, response);

        return (List<MemberAccountInfoDto>) restTemplateUtil.parseListBody(
                restDto, "bankAccountDtoList");
    }

    public Long sumBalance(List<MemberAccountInfoDto> restResponseList) {
        Long sum = 0L;
        for (MemberAccountInfoDto response : restResponseList) {
            sum += response.getAccount().getBalance();
        }

        return sum;
    }

    public GetUserAccountSimpleDto.Response getAccountSimpleList(Member member) {

//        List<Account> accountList = accountCustomRepository.findById(
//                member.getId());

        List<UserAccountSimpleDto> userAccountSimpleDtoList = new ArrayList<>();

//        for (Account account : accountList) {
//            userAccountSimpleDtoList.add(UserAccountSimpleDto.parseDto(account));
//        }

        return new GetUserAccountSimpleDto.Response(userAccountSimpleDtoList);
    }

    public GetOppositeAccountDto.Response getOppositeAccount(GetOppositeAccountDto.Request request, String memberId) throws JsonProcessingException {

        List<Account> accountList =  accountCustomRepository.findByOriginNo(request.getOriginNo());

        if(accountList.size() == 0) {
            GetOppositeAccountDto.Response response = getMyDataOppositeAccount(request, memberId);
            return response;
        }

        return null;
    }

    public GetOppositeAccountDto.Response getMyDataOppositeAccount(GetOppositeAccountDto.Request request, String memberId) throws JsonProcessingException {

        String token = redisUtil.getMyDataToken(memberId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                request, "/my-data/opposite/account",
                HttpMethod.POST);

        RestDto<OppositeAccountDto> restDto = new RestDto<>(OppositeAccountDto.class, response);

        OppositeAccountDto oppositeAccountDto = (OppositeAccountDto) restTemplateUtil.parseBody(
                restDto, "oppositeAccountDto");

        return GetOppositeAccountDto.Response.builder().oppositeAccountDto(oppositeAccountDto).build();
    }

    public GetBalanceDto.Response getBalance(String accountNo, String username)
            throws JsonProcessingException {

        // 먼저 핀볼 계좌를 확인하고 있으면 바로 금액 리턴
        List<FinBallAccount> finBallAccountList = finBallAccountCustomRepository.findByAccountNoAndMemberId(accountNo, username);
        if(finBallAccountList.size() == 1) {
            FinBallAccount finBallAccount = finBallAccountList.get(0);
            return new GetBalanceDto.Response(finBallAccount.getBalance());
        }

        // 없으면 연결된 계좌 확인해서 연결된 계좌가 있으면 resttemplate으로 금액 받아오기
        List<Account> accountList = accountCustomRepository.findByAccountNoAndMemberId(accountNo, username);
        if(accountList.size() == 1) {
            return new GetBalanceDto.Response(getBalanceFromMyData(accountNo,username));
        }

        // 연결된 계좌도 없으면 계좌 없다고 알려주기
        throw new CustomException(ErrorCode.DATA_NOT_FOUND);
    }

    public Long getBalanceFromMyData(String accountNo, String userId) throws JsonProcessingException {
        String token = redisUtil.getMyDataToken(userId);

        ResponseEntity<String> response = restTemplateUtil.callMyData(token,
                null, "/my-data/account/balance/" + accountNo,
                HttpMethod.GET);
        RestDto<Long> restDto = new RestDto<>(Long.class, response);
        Long balance = (Long) restTemplateUtil.parseBody(
                restDto, "balance");
        return balance;
    }
}
