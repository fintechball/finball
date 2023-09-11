package com.finball.mydata.service;

import com.finball.mydata.entity.Member;
import com.finball.mydata.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void regist(Member member) {
        String name = member.getName();
        String registrationNumber = bCryptPasswordEncoder.encode(member.getRegistrationNumber());

        Member registMember = Member.builder().name(name).registrationNumber(registrationNumber).roles("ROLE_USER").build();
        memberRepository.save(registMember);
    }
}
