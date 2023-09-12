package com.finball.mydata.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.finball.mydata.dto.account.GetAccountsDto;
import com.finball.mydata.dto.Response;
import com.finball.mydata.jwt.JwtProperties;
import com.finball.mydata.security.auth.PrincipalDetails;
import com.finball.mydata.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/mydata/account")
    public Response<GetAccountsDto.Response> getAccounts(
            @RequestBody GetAccountsDto.Request request,
            @AuthenticationPrincipal PrincipalDetails userDetails) {
        long id = userDetails.getMember().getId();
        GetAccountsDto.Response response = accountService.getAccounts(id, request);
        return new Response<>("200", "계좌 조회 완료", response);
    }
}
