package com.example.backend.dto.member;

import com.example.backend.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberLoginDto {

    private String accessToken;
    private String refreshToken;
    private String name;
    private String userId;

    public MemberLoginDto(Member member, String accessToken, String refreshToken) {
        this.name = member.getName();
        this.userId = member.getUserId();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
