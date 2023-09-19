package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.bank.BankAccountInfo;
import com.example.backend.dto.card.CardCompanyInfo;
import com.example.backend.dto.card.CardCompanyListDto;
import com.example.backend.dto.card.CardInfo;
import com.example.backend.dto.card.CardListDto;
import com.example.backend.dto.card.CardListDto.Request;
import com.example.backend.dto.card.CardListDto.Response;
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

    public CardListDto.Response getCard(CardListDto.Request request, String userId)
            throws JsonProcessingException {

        List<CardInfo> cardInfoList = getCardInfoList(request, userId);
        List<String> existCardNumber = cardCustomRepository.findCardNumberByMemberId(userId);

        List<CardInfo> response = new ArrayList<>();

        for (CardInfo cardInfo : cardInfoList) {
            if (!existCardNumber.contains(cardInfo.getCardNumber())) {
                response.add(cardInfo);
            }
        }

        return new CardListDto.Response(response);
    }

    private List<CardInfo> getCardInfoList(CardListDto.Request request, String userId)
            throws JsonProcessingException {

        String myDataToken = redisUtil.getMyDataToken(userId);

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMydata(myDataToken, request, "/mydata/card", HttpMethod.POST);
        RestDto<CardInfo> restDto = new RestDto<>(CardInfo.class, responseEntity);
        List<CardInfo> cardInfoList = (List<CardInfo>) restTemplateUtil
                .parseListBody(restDto, "cardList");

        return cardInfoList;
    }
}