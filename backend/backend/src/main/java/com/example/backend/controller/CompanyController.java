package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.company.CompanyListDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.CompanyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/company/{type}")
    public Response<CompanyListDto> getCompany(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable @Valid @Pattern(regexp = "^(bank|card)$", message = "Invalid type. Allowed values are 'bank' or 'card'.") String type)
            throws JsonProcessingException {

        String userId = userDetails.getUsername();
        CompanyListDto.Response response = companyService.getCompanyList(userId, type);

        return new Response(200, "회사 목록 조회를 완료했습니다.", response);
    }

}
