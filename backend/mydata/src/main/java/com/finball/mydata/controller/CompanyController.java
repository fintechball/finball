package com.finball.mydata.controller;

import com.finball.mydata.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CompanyController {
    private CompanyService companyService;
}
