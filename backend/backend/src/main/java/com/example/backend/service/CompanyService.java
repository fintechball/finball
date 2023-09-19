package com.example.backend.service;

import com.example.backend.dto.RestDto;
import com.example.backend.dto.company.CompanyDto;
import com.example.backend.dto.company.CompanyListDto;
import com.example.backend.repository.bank.BankCustomRepository;
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
public class CompanyService {

    private final CardCustomRepository cardCustomRepository;
    private final BankCustomRepository bankCustomRepository;
    private final RestTemplateUtil restTemplateUtil;

    public CompanyListDto.Response getCompanyList(String userId, String type)
            throws JsonProcessingException {

        List<CompanyDto> companyDtoList = getCompanyDtoList(type);
        List<String> existCompanyNameList = getExistCompanyNameList(type, userId);

        companyDtoList = checkConnection(companyDtoList, existCompanyNameList);

        return new CompanyListDto.Response(companyDtoList);
    }

    private List<CompanyDto> getCompanyDtoList(String type) throws JsonProcessingException {

        String url = "/myData/company/" + type;

        ResponseEntity<String> responseEntity = restTemplateUtil
                .callMydata(null, null, url, HttpMethod.GET);
        RestDto<CompanyDto> restDto = new RestDto<>(CompanyDto.class, responseEntity);
        return (List<CompanyDto>) restTemplateUtil.parseListBody(restDto, "companyDtoList");

    }

    private List<String> getExistCompanyNameList(String type, String userId) {

        if (type == "bank") {
            return bankCustomRepository.findCpCodeByMemberId(userId);
        }
        return cardCustomRepository.findCpCodeByMemberId(userId);

    }


    public List<CompanyDto> checkConnection(List<CompanyDto> companyDtoList,
            List<String> existCompanyNameList) {
        for (CompanyDto companyDto : companyDtoList) {
            if (existCompanyNameList.contains(companyDto.getName())) {
                companyDto.setConnected(true);
            }
        }

        return companyDtoList;
    }
}
