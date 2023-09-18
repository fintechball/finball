package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.company.GetCompanyListDto;
import com.finball.mydata.service.CompanyService;
import com.finball.mydata.type.CompanyType;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("/mydata/bank")
    public Response<?> getBanks() {
        GetCompanyListDto.Response response = companyService.getCompanies(CompanyType.은행사);
        return new Response<>(200, "성공적으로 은행사 정보를 불러왔습니다.", response);
    }

    @GetMapping("/mydata/cardCompany")
    public Response<?> getCardCompany() {
        GetCompanyListDto.Response response = companyService.getCompanies(CompanyType.카드사);
        return new Response<>(200, "성공적으로 카드사 정보를 불러왔습니다.", response);
    }

}
