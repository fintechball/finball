package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.card.CardCompanyInfo;
import com.example.backend.dto.card.CardCompanyListDto;
import com.example.backend.repository.card.CardCustomRepository;
import com.example.backend.util.RestTemplateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
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

    public CardCompanyListDto.Response getCardCompanies(String userId)
            throws JsonProcessingException {

        List<CardCompanyInfo> cardCompanyInfoList = getCardCompanyInfoList();
        List<String> existCardCompanyName = cardCustomRepository.findCpCodeByMemberId(userId);

        for (CardCompanyInfo cardCompanyInfo : cardCompanyInfoList) {
            if (existCardCompanyName.contains(cardCompanyInfo.getName())) {
                cardCompanyInfo.setConnected(true);
            }
        }

        return new CardCompanyListDto.Response(cardCompanyInfoList);
    }

    private List<CardCompanyInfo> getCardCompanyInfoList() throws JsonProcessingException {

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMydata(null, null, "/mydata/cardCompany", HttpMethod.GET);
        RestDto<CardCompanyInfo> restDto = new RestDto<>(CardCompanyInfo.class, responseEntity);
        List<CardCompanyInfo> cardCompanyInfoList = (List<CardCompanyInfo>) restTemplateUtil
                .parseListBody(restDto, "companyInfoDtoList");

        return cardCompanyInfoList;
    }
}