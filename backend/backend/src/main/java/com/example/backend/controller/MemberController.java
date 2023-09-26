package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.TokenDto;
import com.example.backend.dto.UserSignUpDto;
import com.example.backend.dto.member.AuthEasyPasswordDto;
import com.example.backend.dto.member.MemberPointDto;
import com.example.backend.dto.member.PointDto;
import com.example.backend.dto.member.RegistEasyPasswordDto;
import com.example.backend.dto.member.UserIdDuplicateCheckDto;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.MemberService;
import com.example.backend.service.RefreshTokenService;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
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
        TokenDto.Response response = refreshTokenService.reissue(request);

        return new Response(200, "정상적으로 토큰이 갱신되었습니다.", response);
    }

    @DeleteMapping("/user")
    public Response<?> logout(HttpServletRequest request) {
        refreshTokenService.logout(request);

        return new Response(200, "로그아웃이 완료되었습니다..");
    }

    @PostMapping("/user/authentication/id")
    public Response<?> idCheck(@RequestBody UserIdDuplicateCheckDto.Request request)
            throws IllegalAccessException {
        memberService.idCheck(request);
        return new Response(200, "사용가능한 아이디입니다.");
    }

    @PostMapping("/user/easyPassword")
    public Response<?> registEasyPassword(@RequestBody RegistEasyPasswordDto.Request request,
            @AuthenticationPrincipal
            UserDetailsImpl userDetails) {
        memberService.registEasyPassword(request, userDetails.getMember());
        return new Response<>(200, "성공적으로 간편비밀번호가 설정되었습니다.");
    }

    @PostMapping("/user/auth/easyPassword")
    public Response<?> authEasyPassword(@RequestBody AuthEasyPasswordDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        memberService.authEasyPassword(request, userDetails.getMember());
        return new Response<>(200, "성공적으로 간편비밀번호 인증에 성공했습니다.");
    }

<<<<<<< backend/backend/src/main/java/com/example/backend/controller/MemberController.java
    @PostMapping("/user/quiz/point")
    public Response<?> updateMemberPoint(@RequestBody MemberPointDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        memberService.updatePoint(request.getPoint(), userDetails.getMember());
        return new Response<>(200, "성공적으로 포인트가 적립되었습니다");
=======
    @GetMapping("/user/point")
    public Response<PointDto.Response> getPoint(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        PointDto.Response response = memberService.getPoint(userDetails.getUsername());
        return new Response(200, "포인트를 조회하였습니다.", response);
>>>>>>> backend/backend/src/main/java/com/example/backend/controller/MemberController.java
    }
}
