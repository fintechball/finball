package com.finball.mydata.controller;


import com.finball.mydata.entity.Member;
import com.finball.mydata.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("regist")
    public String join(@RequestBody Member member) {

        memberService.regist(member);
        return "회원가입완료";
    }


}
