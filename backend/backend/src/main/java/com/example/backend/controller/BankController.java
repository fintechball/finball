package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.bank.BankAccountListDto;
import com.example.backend.dto.bank.BankListDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.BankService;
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

    @PostMapping("bank/account")
    public Response<BankAccountListDto> getBankAccount(
            @RequestBody BankAccountListDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws JsonProcessingException {

        BankAccountListDto.Response response = bankService
                .getBankAccount(request, userDetails.getUsername());

        return new Response(200, "은행 계좌 목록을 성공적으로 반환하였습니다.", response);
    }

}
