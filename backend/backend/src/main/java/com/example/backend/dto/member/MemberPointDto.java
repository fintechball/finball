package com.example.backend.dto.member;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class MemberPointDto {

    @Data
    @RequiredArgsConstructor
    public static class Request {
        private int point;
    }
}
