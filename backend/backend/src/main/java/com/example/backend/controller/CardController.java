package com.example.backend.controller;


import com.example.backend.dto.Response;
import com.example.backend.dto.card.CardCompanyInfo;
import com.example.backend.dto.card.CardCompanyListDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("cardCompany")
    public Response<CardCompanyInfo> getBank(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        CardCompanyListDto.Response response = cardService.getCardCompany(userDetails.getUsername());

        return new Response(200, "카드사 목록을 성공적으로 반환하였습니다.", response);
    }


}
