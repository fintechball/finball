package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.member.MemberMydataDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.MydataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MyDataController {

    private final MydataService mydataService;

    @PostMapping("/user/mydata")
    public Response<?> signUpMydata(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody MemberMydataDto.Request request)
            throws JsonProcessingException {

        mydataService.getToken(request, userDetails.getUsername());

        return new Response(200, "mydata 인증 완료", null);
    }

}
