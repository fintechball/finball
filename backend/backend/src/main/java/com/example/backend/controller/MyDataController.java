package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.member.MemberMyDataDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.MyDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MyDataController {

    private final MyDataService myDataService;

    @PostMapping("/user/mydata")
    public Response<?> signUpMyData(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody MemberMyDataDto.Request request)
            throws JsonProcessingException {

        myDataService.getToken(request, userDetails.getUsername());

        return new Response(200, "myData 인증 완료", null);
    }

}