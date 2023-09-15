package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.company.GetBankListDto;
import com.finball.mydata.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("/mydata/bank")
    public Response<?> getBanks() {
        GetBankListDto.Response response = companyService.getBanks();
        return new Response<>(200, "성공적으로 은행사 정보를 불러왔습니다.", response);
    }

}
