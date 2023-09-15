package com.finball.mydata.service;

import com.finball.mydata.dto.company.BankInfo;
import com.finball.mydata.dto.company.BankListDto;
import com.finball.mydata.dto.company.BankListDto.Response;
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

    public Response getBankList() {

        List<Company> companyList = companyRepository.findAll();

        List<BankInfo> bankInfoList = new ArrayList<>();

        for (Company company : companyList) {
            if (company.getCpType().equals(CompanyType.은행사)) {
                bankInfoList.add(new BankInfo(company.getCpName(), company.getCpLogo(),
                        company.getCpCode(), false));
            }
        }

        return new Response(bankInfoList);
    }
}
