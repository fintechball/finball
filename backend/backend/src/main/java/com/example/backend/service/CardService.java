package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.card.*;
import com.example.backend.entity.Card;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.card.CardCustomRepository;
import com.example.backend.repository.card.CardRepository;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardCustomRepository cardCustomRepository;
    private final MemberRepository memberRepository;
    private final CardRepository cardRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public CardListDto.Response getCard(CardListDto.Request request, String userId)
            throws JsonProcessingException {

        List<CardDto> cardDtoList = getCardDtoList(request, userId);
        List<String> existCardNumber = cardCustomRepository.findCardNumberByMemberId(userId);

        List<CardDto> response = new ArrayList<>();

        for (CardDto cardDto : cardDtoList) {
            if (!existCardNumber.contains(cardDto.getCard().getNo())) {
                response.add(cardDto);
            }
        }

        return new CardListDto.Response(response);
    }

    private List<CardDto> getCardDtoList(CardListDto.Request request, String userId)
            throws JsonProcessingException {

        String myDataToken = redisUtil.getMyDataToken(userId);

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMyData(myDataToken, request, "/my-data/card", HttpMethod.POST);
        RestDto<CardDto> restDto = new RestDto<>(CardDto.class, responseEntity);
        List<CardDto> cardDtoList = (List<CardDto>) restTemplateUtil
                .parseListBody(restDto, "cardList");

        return cardDtoList;
    }

    public void registerCard(CardRegisterDto.Request request, String userId) {

        Optional<Member> memberOptional = memberRepository.findByUserId(userId);

        if(!memberOptional.isPresent()) {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        Member member = memberOptional.get();
        List<Card> cardList = new ArrayList<>();

        for (CardDto cardDto : request.getCardList()) {
            cardList.add(CardRegisterDto.toCard(cardDto, member));
        }

        cardRepository.saveAll(cardList);
    }

    public GetCardListDto.Response getCardList(String userId) {

        List<Card> cardList = cardCustomRepository.findCardByMemberId(userId);

        List<GetCardDto> getCardDtoList = new ArrayList<>();

        for (Card card : cardList) {
            getCardDtoList.add(card.toGetCardDto());
        }

        return new GetCardListDto.Response(getCardDtoList);


    }
}