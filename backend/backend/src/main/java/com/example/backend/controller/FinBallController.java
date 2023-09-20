package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.finball.FinancialBookDto;
import com.example.backend.dto.finball.RegisterFinBallBookDto;
import com.example.backend.dto.finball.RegistFinballDto;
import com.example.backend.dto.finball.RegisterFinancialBookCategoryDto;
import com.example.backend.entity.Member;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.FinBallService;
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
public class FinBallController {

    private final FinBallService finballService;

    @PostMapping("/account/finBall")
    public Response createAccount(@RequestBody RegistFinballDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.createAccount(request, member);

        return new Response<>(200, "핀볼 계좌가 만들어졌습니다.");
    }

    @PostMapping("/financialBook") //가계부 최초 생성 요청
    public Response createFinancialBook(@RequestBody RegisterFinBallBookDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.createCategory(request, member);

        return new Response<>(200, "가계부가 생성되었습니다.");
    }

    @GetMapping("/financialBook") //가계부 불러오기
    public Response readFinancialBook(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        FinancialBookDto.Response data = finballService.readFinancialBook(member);

        return new Response<>(200, "가계부를 조회하였습니다.", data);
    }

    @PostMapping("/financialBook/category")
    public Response addFinancialBookCategory(
            @RequestBody RegisterFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        FinancialBookDto.Response data = finballService.addFinancialBookCategory(request, member);

        return new Response<>(200, "가계부에 카테고리가 추가되었습니다.", data);
    }
}
