package com.example.backend.controller;


import com.example.backend.dto.Response;
import com.example.backend.dto.card.CardListDto;
import com.example.backend.dto.card.CardRegisterDto;
import com.example.backend.dto.card.GetCardListDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.CardService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @PostMapping("/card")
    public Response<CardListDto.Response> getCard(
            @RequestBody CardListDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws JsonProcessingException {

        String userId = userDetails.getUsername();
        CardListDto.Response response = cardService.getCard(request, userId);

        return new Response(200, "사용자 카드 목록을 성공적으로 반환하였습니다.", response);
    }

    @PostMapping("/user/card")
    public Response<?> registerCard(
            @RequestBody CardRegisterDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws JsonProcessingException {

        String userId = userDetails.getUsername();
        cardService.registerCard(request, userId);

        return new Response(200, "사용자 카드를 성공적으로 저장하였습니다.");
    }

    @GetMapping("/user/card")
    public Response<GetCardListDto.Response> getCardList(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        String userId = userDetails.getUsername();
        GetCardListDto.Response response = cardService.getCardList(userId);

        return new Response(200, "DB의 사용자 카드 목록을 성공적으로 반환하였습니다.", response);
    }



}