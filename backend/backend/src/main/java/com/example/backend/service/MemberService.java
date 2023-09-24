package com.example.backend.service;

import com.example.backend.dto.TokenDto;
import com.example.backend.dto.UserSignUpDto.Request;
import com.example.backend.dto.member.RegistEasyPasswordDto;
import com.example.backend.dto.member.UserIdDuplicateCheckDto;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.member.MemberRepository;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void userSignUp(Request request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Member member = request.toMember(encodedPassword);
        memberRepository.save(member);
    }

    public void idCheck(UserIdDuplicateCheckDto.Request request) {
        String userId = request.getUserId();

        if (memberRepository.findByUserId(userId).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_USER_ID);
        }
    }

    public void registEasyPassword(RegistEasyPasswordDto.Request request, Member member) {
        member.registerEasyPassword(request.getEasyPassword());
        memberRepository.save(member);
    }
}
