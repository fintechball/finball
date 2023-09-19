package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.dto.bank.BankAccountListDto;
import com.example.backend.dto.bank.BankListDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.BankService;
import com.example.backend.service.TransferService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
public class BankController {

    private final BankService bankService;
    private final TransferService transferService;

    @GetMapping("bank")
    public Response<BankListDto> getBank(@AuthenticationPrincipal UserDetailsImpl userDetails)
            throws JsonProcessingException {

        BankListDto.Response response = bankService.getBank(userDetails.getUsername());

        return new Response(200, "은행 목록을 성공적으로 반환하였습니다.", response);
    }

    @PostMapping("bank/account")
    public Response<BankAccountListDto> getBankAccount(
            @RequestBody BankAccountListDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws JsonProcessingException {

        BankAccountListDto.Response response = bankService
                .getBankAccount(request, userDetails.getUsername());

        return new Response(200, "은행 계좌 목록을 성공적으로 반환하였습니다.", response);
    }

    @PostMapping("/user/transfer")
    public Response<?> transfer(
            @RequestBody AccountTransferDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) throws JsonProcessingException {
        transferService.transfer(userDetails.getMember(), request);
        return new Response<>(200, "", null);
    }
}

