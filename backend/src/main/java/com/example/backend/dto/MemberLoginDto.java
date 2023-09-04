package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberLoginDto {

    @Data
    public static class Request {
        private String memberId;
        private String password;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        private TokenInfo tokenInfo;
    }
}
