package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.finball.RegistFinballDto;
import com.example.backend.entity.Member;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.FinballService;
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
public class FinballController {

    private final FinballService finballService;

    @PostMapping("/account/finball")
    public Response createAccount(@RequestBody RegistFinballDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();

        finballService.createAccount(request, member);

        return new Response<>(200, "핀볼 계좌가 만들어졌습니다.");
    }
}
