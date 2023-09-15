package com.finball.mydata.service;

import com.finball.mydata.dto.company.BankInfoDto;
import com.finball.mydata.dto.company.GetBankListDto;
import com.finball.mydata.dto.company.GetBankListDto.Response;
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

    public GetBankListDto.Response getBanks() {
        List<Company> companies = companyRepository.findAllByCpType(CompanyType.은행사);
        List<BankInfoDto> bankInfoDtoList = new ArrayList<>();

        for(Company company : companies){
            bankInfoDtoList.add(company.toBankInfoDto());
        }

        return GetBankListDto.Response.builder()
                .bankList(bankInfoDtoList)
                .build();
    }
}
