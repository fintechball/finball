package com.example.backend.service;

import com.example.backend.dto.TokenInfo;
import com.example.backend.dto.UserSignUpDto.Request;
import com.example.backend.entity.Member;
import com.example.backend.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void userSignUp(Request request) {

        Member member = request.toMember();

        memberRepository.save(member);
    }
}
