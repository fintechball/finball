package com.example.backend.dto.member;

import lombok.Data;

@Data
public class UserIdDuplicateCheckDto {

    @Data
    public static class Request {
        String userId;
    }

}
