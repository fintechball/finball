package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.account.AccountRegisterDto;
import com.example.backend.dto.account.GetUserAccountDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.AccountService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/user/account")
    public Response<?> registerAccount(@RequestBody AccountRegisterDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        accountService.register(request, userDetails.getMember());

        return new Response<>(200, "정상적으로 사용자의 타행 계좌가 등록되었습니다.", null);
    }

    @GetMapping("/user/account")
    public Response<GetUserAccountDto.Response> getAccount(@AuthenticationPrincipal UserDetailsImpl userDetails)
            throws JsonProcessingException {
        GetUserAccountDto.Response response = accountService.getAccountList(userDetails.getMember());
        return new Response<>(200, "정상적으로 사용자의 타행 계좌를 불러왔습니다.", response);
    }
}
