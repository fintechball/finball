package com.finball.mydata.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.account.AccountTransferDto;
import com.finball.mydata.dto.account.BankAccountListDto;
import com.finball.mydata.dto.account.GetBalanceDto;
import com.finball.mydata.dto.account.GetMemberAccountDto;
import com.finball.mydata.dto.account.GetOppositeAccountDto;
import com.finball.mydata.security.auth.PrincipalDetails;
import com.finball.mydata.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/my-data/bank/account")
    public Response<BankAccountListDto.Response> getBankAccountList(
            @RequestBody BankAccountListDto.Request request,
            @AuthenticationPrincipal PrincipalDetails userDetails) {
        Long id = userDetails.getMember().getId();
        BankAccountListDto.Response response = accountService.getBankAccountList(id, request);
        return new Response<>(200, "계좌 조회 완료", response);
    }

    @GetMapping("/create/account/{memberId}")
    public void createAccount(@PathVariable Long memberId) throws Exception {
        accountService.createAccount(memberId);
    }

    @PostMapping("/my-data/transfer")
    public Response<AccountTransferDto.Response> accountTransfer(
            @RequestBody AccountTransferDto.Request request) {

        AccountTransferDto.Response response = accountService.accountTransfer(request);

        return new Response<>(200, "이체에 성공했습니다.", response);
    }

    @PostMapping("/my-data/member/account")
    public Response<GetMemberAccountDto.Response> getMemberAccount(
            @RequestBody GetMemberAccountDto.Request request,
            @AuthenticationPrincipal PrincipalDetails userDetails) {

        GetMemberAccountDto.Response response = accountService.getMemberAccount(
                request.getAccountList(), userDetails.getMember());

        return new Response<>(200, "해당 사용자가 원하는 계좌 정보를 불러왔습니다.", response);
    }


    @PostMapping("/my-data/opposite/account")
    public Response<GetOppositeAccountDto.Response> getOppositeAccount(@RequestBody GetOppositeAccountDto.Request request) throws JsonProcessingException {

        GetOppositeAccountDto.Response response = accountService.getOppositeAccount(request);

        System.out.println(response.toString());

        return new Response(200, "상대방의 계좌 정보를 불러왔습니다.", response);

    }

    @GetMapping("/my-data/account/balance/{accountNo}")
    public Response<GetBalanceDto.Response> getBalance(@PathVariable String accountNo) {

        GetBalanceDto.Response response = accountService.getBalance(accountNo);
        return new Response(200, "계좌의 잔액을 조회하였습니다.", response);
    }

}
