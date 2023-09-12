package com.finball.mydata.controller;


import com.finball.mydata.dto.MemberDto;
import com.finball.mydata.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mydata")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("regist")
    public String join(@RequestBody MemberDto.Request request) {

        memberService.regist(request);
        return "회원가입완료";
    }

    @GetMapping("test")
    public String test() {
        return "test";
    }


}
