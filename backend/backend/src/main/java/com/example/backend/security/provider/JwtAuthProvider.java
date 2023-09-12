package com.example.backend.security.provider;

import com.example.backend.entity.Member;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.security.UserDetailsImpl;
import com.example.backend.security.jwt.JwtDecoder;
import com.example.backend.security.jwt.JwtPreProcessingToken;
import com.example.backend.security.jwt.JwtTokenUtils;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class JwtAuthProvider implements AuthenticationProvider {

    private final JwtTokenUtils jwtTokenUtils;
    private final MemberRepository memberRepository;
    private final JwtDecoder jwtDecoder;

    public JwtAuthProvider(JwtTokenUtils jwtTokenUtils, MemberRepository memberRepository) {
        this.jwtDecoder = new JwtDecoder(jwtTokenUtils);
        this.memberRepository = memberRepository;
        this.jwtTokenUtils = jwtTokenUtils;
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        System.out.println("JwtAuthProvider : authenticate");

        String token = (String) authentication.getPrincipal();

        String userId = jwtDecoder.decodeUsername(token);

        Member member = memberRepository.findByUserId(userId).get();

        UserDetailsImpl userDetails = new UserDetailsImpl(member);

        return new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.isAssignableFrom(JwtPreProcessingToken.class);
    }
}
