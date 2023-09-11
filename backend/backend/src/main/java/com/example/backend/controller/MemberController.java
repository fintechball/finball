package com.example.backend.controller;

import com.example.backend.dto.MemberLoginDto;
import com.example.backend.dto.MemberLoginDto.Response;
import com.example.backend.dto.TokenInfo;
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

    @PostMapping("/member/login")
    public MemberLoginDto.Response login(@RequestBody MemberLoginDto.Request request) {
        String memberId = request.getMemberId();
        String password = request.getPassword();
        TokenInfo tokenInfo = memberService.login(memberId, password);
        return new Response(tokenInfo);
    }
}
