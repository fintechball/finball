package com.finball.mydata.security.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.finball.mydata.entity.Member;
import com.finball.mydata.jwt.JwtProperties;
import com.finball.mydata.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;


// http://localhost:8080/login 요청이 들어오면 실행될꺼임
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String registrationNumber) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService의 loadUserByUsername()");

        Member member = memberRepository.findByRegistrationNumber(registrationNumber);


        System.out.println(member.getRegistrationNumber());
        System.out.println(member.getPassword());
        return new PrincipalDetails(member);
    }
}
