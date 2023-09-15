package com.finball.mydata.controller;

import com.finball.mydata.dto.account.AccountTransferDto;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.finball.mydata.dto.account.GetAccountsDto;
import com.finball.mydata.dto.Response;
import com.finball.mydata.entity.Member;
import com.finball.mydata.jwt.JwtProperties;
import com.finball.mydata.security.auth.PrincipalDetails;
import com.finball.mydata.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/mydata/account")
    public Response<GetAccountsDto.Response> getAccounts(
            @RequestBody GetAccountsDto.Request request,
            @AuthenticationPrincipal PrincipalDetails userDetails) {
        Member member = userDetails.getMember();
        GetAccountsDto.Response response = accountService.getAccounts(member, request);
        return new Response<>(200, "계좌 조회 완료", response);
    }

    @GetMapping("/create/account/{memberId}")
    public void createAccount(@PathVariable Long memberId) throws Exception {
        accountService.createAccount(memberId);
    }

    @PostMapping("/mydata/transfer")
    public AccountTransferDto.Response accountTransfer(@RequestBody AccountTransferDto.Request request) {

        AccountTransferDto.Response response = accountService.accountTransfer(request);

        return response;
    }


}
