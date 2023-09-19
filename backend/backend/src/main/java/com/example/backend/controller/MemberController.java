package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.TokenDto;
import com.example.backend.dto.UserSignUpDto;
import com.example.backend.dto.member.UserIdDuplicateCheckDto;
import com.example.backend.service.MemberService;
import com.example.backend.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/user")
    public Response<?> userSignUp(@RequestBody UserSignUpDto.Request request) {
        memberService.userSignUp(request);
        return new Response(200, "정상적으로 회원가입이 완료되었습니다.");
    }

    @PostMapping("/reissue")
    public Response<?> reissue(HttpServletRequest request) throws IllegalAccessException {
        TokenDto newToken = refreshTokenService.reissue(request);

        return new Response(200, "정상적으로 토큰이 갱신되었습니다.", newToken);
    }

    @DeleteMapping("/user")
    public Response<?> logout(HttpServletRequest request) {
        refreshTokenService.logout(request);

        return new Response(200, "로그아웃이 완료되었습니다..");
    }

    @PostMapping("/user/authentication/id")
    public Response<?> idCheck(@RequestBody UserIdDuplicateCheckDto.Request request) throws IllegalAccessException {
        memberService.idCheck(request);

        return new Response(200, "사용가능한 아이디입니다.");
    }

}
