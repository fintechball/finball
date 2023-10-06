package com.example.backend.dto.member;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberMyDataDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        private String name;
        private String registrationNumber;

    }
}