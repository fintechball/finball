package com.finball.mydata.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.finball.mydata.dto.MemberDto;
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

    public void regist(MemberDto.Request request) {

        String password = bCryptPasswordEncoder
                .encode(request.getName() + request.getRegistrationNumber());

        Member registMember = request.toMember(password);

        memberRepository.save(registMember);
    }
}
