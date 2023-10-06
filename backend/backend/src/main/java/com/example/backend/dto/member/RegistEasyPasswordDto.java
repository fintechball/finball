package com.example.backend.dto.member;

import lombok.Data;

@Data
public class RegistEasyPasswordDto {

    @Data
    public static class Request {
        private String easyPassword;
    }
}
