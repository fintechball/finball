package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.finball.DeleteFinancialBookCategoryDto;
import com.example.backend.dto.finball.FinancialBookDto;
import com.example.backend.dto.finball.RegisterFinBallBookDto;
import com.example.backend.dto.finball.RegistFinballDto;
import com.example.backend.dto.finball.RegisterFinancialBookCategoryDto;
import com.example.backend.dto.finball.UpdateFinancialBookCategoryDto;
import com.example.backend.entity.Member;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.FinBallService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FinBallController {

    private final FinBallService finballService;

    @PostMapping("/account/fin-ball")
    public Response createAccount(@RequestBody RegistFinballDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.createAccount(request, member);

        return new Response<>(200, "핀볼 계좌가 만들어졌습니다.");
    }

    @PostMapping("/financial-book") //가계부 최초 생성 요청
    public Response createFinancialBook(@RequestBody RegisterFinBallBookDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.createCategory(request, member);

        return new Response<>(200, "가계부가 생성되었습니다.");
    }

    @GetMapping("/financial-book") //가계부 불러오기
    public Response<FinancialBookDto.Response> readFinancialBook(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        FinancialBookDto.Response data = finballService.readFinancialBook(member);

        return new Response<>(200, "가계부를 조회하였습니다.", data);
    }

    @PostMapping("/financial-book/category")
    public Response<FinancialBookDto.Response> addFinancialBookCategory(
            @RequestBody RegisterFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        FinancialBookDto.Response data = finballService.addFinancialBookCategory(request, member);

        return new Response<>(200, "가계부에 카테고리가 추가되었습니다.", data);
    }

    @DeleteMapping("/financial-book/category")
    public Response<FinancialBookDto.Response> deleteFinancialBookCategory(
            @RequestBody DeleteFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        FinancialBookDto.Response data = finballService.deleteFinancialBookCategory(request,
                member);

        return new Response<>(200, "가계부에 카테고리가 삭제되었습니다.", data);
    }

    @PutMapping("/financial-book/category")
    public Response<FinancialBookDto.Response> updateFinancialBookCategory(
            @RequestBody UpdateFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        FinancialBookDto.Response data = finballService.updateFinancialBookCategory(request,
                member);

        return new Response<>(200, "가계부 카테고리가 수정되었습니다.", data);
    }

    @DeleteMapping("/financial-book")
    public Response deleteFinancialBook(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.deleteFinancialBook(member);

        return new Response<>(200, "가계부가 삭제되었습니다.");
    }
}
