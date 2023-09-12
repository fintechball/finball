package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.UserSignUpDto;
import com.example.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/user")
    public Response<?> userSignUp(@RequestBody UserSignUpDto.Request request) {
        memberService.userSignUp(request);
        return new Response(200, "정상적으로 회원가입이 완료되었습니다.", null);
    }
}
