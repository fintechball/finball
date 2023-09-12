package com.example.backend.security;

import com.example.backend.entity.Member;
import com.example.backend.repository.member.MemberRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("UserDetailsServiceImpl : loadUserByUsername");

        Member member = memberRepository.findByUserId(username).get();

        if(member == null) {
            throw new NoSuchElementException("토큰에 해당되는 유저가 존재하지 않습니다.");
        }

        return new UserDetailsImpl(member);
    }
}
