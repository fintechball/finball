package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.account.AccountTransferDto;
import com.finball.mydata.dto.account.BankAccountListDto;
import com.finball.mydata.dto.tradeHistory.FinBallTradeHistoryListDto;
import com.finball.mydata.entity.Member;
import com.finball.mydata.security.auth.PrincipalDetails;
import com.finball.mydata.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/myData/bank/account")
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

    @PostMapping("/myData/transfer")
    public AccountTransferDto.Response accountTransfer(
            @RequestBody AccountTransferDto.Request request) {

        System.out.println(request);

        AccountTransferDto.Response response = accountService.accountTransfer(request);

        return response;
    }


}
