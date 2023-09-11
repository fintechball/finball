package com.finball.mydata.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.finball.mydata.entity.Member;
import com.finball.mydata.jwt.JwtProperties;
import com.finball.mydata.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void regist(Member member) {

        String password = bCryptPasswordEncoder.encode(member.getName() + member.getRegistrationNumber());

        Member registMember = Member.builder().name(member.getName())
                                    .registrationNumber(member.getRegistrationNumber())
                                    .password(password)
                                    .roles("ROLE_USER").build();
        memberRepository.save(registMember);
    }
}
