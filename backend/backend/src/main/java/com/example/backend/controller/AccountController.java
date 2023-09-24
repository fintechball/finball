package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.account.AccountRegisterDto;
import com.example.backend.dto.account.FavoriteAccountDto;
import com.example.backend.dto.account.GetUserAccountDto;
import com.example.backend.dto.account.GetUserAccountSimpleDto;
import com.example.backend.dto.mydata.history.AccountHistoryListDto;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.AccountService;
import com.example.backend.service.HistoryService;
import com.example.backend.service.TransferService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final TransferService transferService;
    private final HistoryService historyService;

    @PostMapping("/user/account")
    public Response<?> registerAccount(@RequestBody AccountRegisterDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        accountService.register(request, userDetails.getMember());
        return new Response<>(200, "정상적으로 사용자의 타행 계좌가 등록되었습니다.", null);
    }

    @GetMapping("/user/account")
    public Response<GetUserAccountDto.Response> getAccount(
            @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws JsonProcessingException {
        GetUserAccountDto.Response response = accountService.getAccountList(
                userDetails.getMember());
        return new Response<>(200, "정상적으로 사용자의 타행 계좌를 불러왔습니다.", response);
    }

    @PostMapping("/transfer")
    public Response<?> transfer(@RequestBody AccountTransferDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws JsonProcessingException {
        transferService.send(request, userDetails.getMember());
        return new Response<>(200, "정상적으로 이체가 완료되었습니다.", null);
    }

    @GetMapping("/user/account/{accountNo}")
    public Response<AccountHistoryListDto.Response> getAccountDetail(@PathVariable String accountNo,
            @AuthenticationPrincipal UserDetailsImpl userDetails)
            throws JsonProcessingException {
        AccountHistoryListDto.Response response = historyService.getHistory(accountNo,
                userDetails.getMember());
        return new Response<>(200, "성공적으로 계좌 상세를 불러왔습니다.", response);
    }

    @GetMapping("/user/account/simple")
    public Response<GetUserAccountSimpleDto.Response> getAccountSimple(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        GetUserAccountSimpleDto.Response response = accountService.getAccountSimpleList(
                userDetails.getMember());

        return new Response(200, "정상적으로 사용자의 타행 계좌를 불러왔습니다.", response);
    }
}
