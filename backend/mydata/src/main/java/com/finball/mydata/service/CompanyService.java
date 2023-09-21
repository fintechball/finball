package com.finball.mydata.service;

import com.finball.mydata.dto.company.CompanyDto;
import com.finball.mydata.dto.company.CompanyListDto;
import com.finball.mydata.entity.Company;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.type.CompanyType;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyListDto.Response getCompanies(String type) {

        CompanyType cpType = findType(type);

        List<Company> companies = companyRepository.findAllByCpType(cpType);
        List<CompanyDto> CompanyInfoDtoList = new ArrayList<>();

        for (Company company : companies) {
            CompanyInfoDtoList.add(company.toCompanyInfoDto());
        }

        return new CompanyListDto.Response(CompanyInfoDtoList);
    }

    private CompanyType findType(String type) {

        if (type.equals("bank")) {
            return CompanyType.은행사;
        }
        return CompanyType.카드사;
    }
}
