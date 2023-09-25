package com.finball.mydata.service;

import com.finball.mydata.dto.company.CompanyCodeDto;
import com.finball.mydata.dto.company.CompanyDto;
import com.finball.mydata.dto.company.CompanyListDto;
import com.finball.mydata.entity.Company;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.type.CompanyType;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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
            CompanyInfoDtoList.add(company.toCompanyDto());
        }

        return new CompanyListDto.Response(CompanyInfoDtoList);
    }

    private CompanyType findType(String type) {

        if (type.equals("bank")) {
            return CompanyType.은행사;
        }
        return CompanyType.카드사;
    }

    public CompanyCodeDto.Response getCpCode(String cpName) {
        Company company = companyRepository.findByCpName(cpName);

        if (company == null) {
            throw new NoSuchElementException("존재하지 않는 은행입니다");
        }

//        CompanyCodeDto.Response response = new CompanyCodeDto.Response(company.getCpCode());
        CompanyCodeDto.Response response = null;
        return response;
    }
}
