package com.example.backend.dto.groupaccount;

import lombok.Data;

@Data
public class InviteGroupAccountDto {

    @Data
    public static class Request {
        private String phoneNumber;
        private String url;
        private String name;
    }
}
