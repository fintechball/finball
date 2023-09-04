package com.example.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class MemberLoginRequestDto {
    private String memberId;
    private String password;
}
