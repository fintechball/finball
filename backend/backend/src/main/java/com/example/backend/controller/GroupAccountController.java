package com.example.backend.controller;

import com.example.backend.dto.Response;
import com.example.backend.dto.groupaccount.RegistGroupAccountDto;
import com.example.backend.entity.Member;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.service.GroupAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class GroupAccountController {

    private final GroupAccountService groupAccountService;

    @PostMapping("/group/account")
    public Response registGroupAccount(@RequestBody RegistGroupAccountDto.Request request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Member member = userDetails.getMember();
        Member a = new Member();
        System.out.println(a.getId());
        String response = groupAccountService.save(request, member);
        return new Response<>(201, "계좌 생성 완료", response);
    }
}
