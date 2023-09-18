package com.finball.mydata.service;

import com.finball.mydata.dto.company.CompanyInfoDto;
import com.finball.mydata.dto.company.GetCompanyListDto;
import com.finball.mydata.entity.Company;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.type.CompanyType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public GetCompanyListDto.Response getCompanies(CompanyType type) {
        List<Company> companies = companyRepository.findAllByCpType(type);
        List<CompanyInfoDto> CompanyInfoDtoList = new ArrayList<>();

        for (Company company : companies) {
            CompanyInfoDtoList.add(company.toCompanyInfoDto());
        }

        return GetCompanyListDto.Response.builder()
                .companyInfoDtoList(CompanyInfoDtoList)
                .build();
    }
}
