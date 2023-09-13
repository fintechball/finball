package com.finball.mydata.controller;

import com.finball.mydata.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/create/account/{memberId}")
    public void createAccount(@PathVariable Long memberId) throws Exception {
        accountService.createAccount(memberId);
    }
}
