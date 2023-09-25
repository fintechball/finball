package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.finball.DeleteFinancialBookCategoryDto;
import com.example.backend.dto.finball.GetFinancialBookDto;
import com.example.backend.dto.finball.ReadFinBallDto;
import com.example.backend.dto.finball.ReadFinBallHistoryDto;
import com.example.backend.dto.finball.RegisterFinBallBookDto;
import com.example.backend.dto.finball.RegisterFinBallDto;
import com.example.backend.dto.finball.RegisterFinancialBookCategoryDto;
import com.example.backend.dto.finball.SetCategoryData;
import com.example.backend.dto.finball.UpdateFinancialBookCategoryDto;
import com.example.backend.dto.transfer.AccountTransferDto;
import com.example.backend.dto.transfer.TransferInfoDto;
import com.example.backend.entity.Member;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.FinBallService;
import com.example.backend.service.FinBallTransferService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
    private final FinBallTransferService finBallTransferService;

    @PostMapping("/account/fin-ball")
    public Response createAccount(@RequestBody RegisterFinBallDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.createAccount(request, member);

        return new Response<>(200, "핀볼 계좌가 만들어졌습니다.");
    }

    @GetMapping("/fin-ball")
    public Response<ReadFinBallDto.Response> readFinBall(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        ReadFinBallDto.Response data = finballService.readFinBall(member);

        return new Response<>(200, "핀볼 계좌를 조회했습니다", data);
    }

    @PostMapping("/financial-book") //가계부 최초 생성 요청
    public Response<GetFinancialBookDto.Response> createFinancialBook(
            @RequestBody RegisterFinBallBookDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        GetFinancialBookDto.Response data = finballService.createCategory(request, member);

        return new Response<>(200, "가계부가 생성되었습니다.", data);
    }

    @GetMapping("/financial-book") //가계부 불러오기
    public Response<GetFinancialBookDto.Response> readFinancialBook(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        GetFinancialBookDto.Response data = finballService.readFinancialBook(member);

        return new Response<>(200, "가계부를 조회하였습니다.", data);
    }

    @PostMapping("/financial-book/category")
    public Response<GetFinancialBookDto.Response> addFinancialBookCategory(
            @RequestBody RegisterFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        GetFinancialBookDto.Response data = finballService.addFinancialBookCategory(request,
                member);

        return new Response<>(200, "가계부에 카테고리가 추가되었습니다.", data);
    }

    @DeleteMapping("/financial-book/category")
    public Response<GetFinancialBookDto.Response> deleteFinancialBookCategory(
            @RequestBody DeleteFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        GetFinancialBookDto.Response data = finballService.deleteFinancialBookCategory(request,
                member);

        return new Response<>(200, "가계부에 카테고리가 삭제되었습니다.", data);
    }

    @PutMapping("/financial-book/category")
    public Response<GetFinancialBookDto.Response> updateFinancialBookCategory(
            @RequestBody UpdateFinancialBookCategoryDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        GetFinancialBookDto.Response data = finballService.updateFinancialBookCategory(request,
                member);

        return new Response<>(200, "가계부 카테고리가 수정되었습니다.", data);
    }

    @DeleteMapping("/financial-book")
    public Response deleteFinancialBook(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        finballService.deleteFinancialBook(member);

        return new Response<>(200, "가계부가 삭제되었습니다.");
    }

    @GetMapping("/fin-ball/history")
    public Response<ReadFinBallHistoryDto.Response> readFinBallHistoryList(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        ReadFinBallHistoryDto.Response data = finballService.readFinBallHistoryList(member);

        return new Response(200, "핀볼 히스토리를 조회했습니다.", data);
    }

    @PostMapping("/fin-ball/transfer")
    public Response<ReadFinBallHistoryDto.Response> transferFinBallAccount(
            @RequestBody AccountTransferDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws JsonProcessingException {

        Member member = userDetails.getMember();
        ReadFinBallHistoryDto.Response data = finBallTransferService.transferFinBallAccount(request,
                member);

        return new Response<>(200, "이체가 완료 되었습니다.", data);
    }

    @PostMapping("/fin-ball/category")
    public Response setCategory(@RequestBody SetCategoryData.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Member member = userDetails.getMember();
        ReadFinBallHistoryDto.Response data = finballService.setCategory(request, member);

        return new Response<>(200, "거래내역에 카테고리를 지정하였습니다.", data);
    }
}
