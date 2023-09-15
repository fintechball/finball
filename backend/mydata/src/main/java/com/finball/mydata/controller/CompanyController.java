package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.company.BankListDto;
import com.finball.mydata.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("bank")
    public Response<BankListDto.Response> getBankList() {

        BankListDto.Response response = companyService.getBankList();

        return new Response(200, "완료", response);
    }
}
