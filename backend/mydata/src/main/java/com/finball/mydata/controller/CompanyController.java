package com.finball.mydata.controller;

import com.finball.mydata.dto.MemberDto;
import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.company.BankListDto;
import com.finball.mydata.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CompanyController {
    private CompanyService companyService;

    @GetMapping("bank")
    public Response<BankListDto.Response> getBankList() {

        BankListDto.Response response = companyService.getBankList();


        return new Response(200, "완료", response);
    }

    @PostMapping("test")
    public String test(@RequestBody MemberDto.Request request) {

        System.out.println(request);
        return "test";
    }
}
