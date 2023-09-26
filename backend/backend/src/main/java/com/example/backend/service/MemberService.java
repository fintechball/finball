package com.example.backend.service;

import com.example.backend.dto.TokenDto;
import com.example.backend.dto.UserSignUpDto.Request;
import com.example.backend.dto.member.AuthEasyPasswordDto;
import com.example.backend.dto.member.PointDto;
import com.example.backend.dto.member.PointDto.Response;
import com.example.backend.dto.member.RegistEasyPasswordDto;
import com.example.backend.dto.member.UserIdDuplicateCheckDto;
import com.example.backend.entity.Member;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.CustomException;
import com.example.backend.repository.member.MemberRepository;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
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

    public void authEasyPassword(AuthEasyPasswordDto.Request request, Member member) {
        if(request.getEasyPassword().length() > 6) {
            throw new CustomException(ErrorCode.EASY_PASSWORD_INVALID);
        }
        if(!request.getEasyPassword().equals(member.getEasyPassword())){
            throw new CustomException(ErrorCode.EASY_PASSWORD_NO_SUCH_ELEMENT);
        }
    }

    @Transactional
    public void updatePoint(int point, Member member) {
        member.updatePoint(point);
        memberRepository.save(member);
    }

    public PointDto.Response getPoint(String username) {

        Optional<Member> optionalMember = memberRepository.findByUserId(username);

        if(!optionalMember.isPresent()) {
            throw new CustomException(ErrorCode.NOT_SAME_DATA_VALUE);
        }

        Member member = optionalMember.get();

        return new PointDto.Response(member.getPoint());
    }
}
