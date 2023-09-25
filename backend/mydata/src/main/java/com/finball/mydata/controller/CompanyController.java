package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.company.CompanyCodeDto;
import com.finball.mydata.dto.company.CompanyListDto;
import com.finball.mydata.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/my-data/company/{type}")
    public Response<?> getCardCompany(@PathVariable String type) {
        CompanyListDto.Response response = companyService.getCompanies(type);
        return new Response<>(200, "성공적으로 회사 정보를 불러왔습니다.", response);
    }

    @GetMapping("/my-data/company/name/{cpName}")
    public Response<?> getCpCode(@PathVariable String cpName) {
        CompanyCodeDto.Response response = companyService.getCpCode(cpName);
        return new Response<>(200, "성공적으로 회사 이름을 불러왔습니다.", response);
    }
}
