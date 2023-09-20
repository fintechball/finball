package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.card.CardDto;
import com.example.backend.dto.card.CardListDto;
import com.example.backend.repository.card.CardCustomRepository;
import com.example.backend.util.RedisUtil;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardCustomRepository cardCustomRepository;
    private final RestTemplateUtil restTemplateUtil;
    private final RedisUtil redisUtil;

    public CardListDto.Response getCardList(CardListDto.Request request, String userId)
            throws JsonProcessingException {

        List<CardDto> cardDtoList = getCardDtoList(request, userId);
        List<String> existCardNumber = cardCustomRepository.findCardNumberByMemberId(userId);

        List<CardDto> response = new ArrayList<>();

        for (CardDto cardDto : cardDtoList) {
            if (!existCardNumber.contains(cardDto.getCardNumber())) {
                response.add(cardDto);
            }
        }

        return new CardListDto.Response(response);
    }

    private List<CardDto> getCardDtoList(CardListDto.Request request, String userId)
            throws JsonProcessingException {

        String myDataToken = redisUtil.getMyDataToken(userId);

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMyData(myDataToken, request, "/myData/card", HttpMethod.POST);
        RestDto<CardDto> restDto = new RestDto<>(CardDto.class, responseEntity);
        List<CardDto> cardDtoList = (List<CardDto>) restTemplateUtil
                .parseListBody(restDto, "cardDtoList");

        return cardDtoList;
    }
}