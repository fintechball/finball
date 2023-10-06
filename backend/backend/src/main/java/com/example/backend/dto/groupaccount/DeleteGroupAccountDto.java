package com.example.backend.dto.groupaccount;

import lombok.Data;

@Data
public class DeleteGroupAccountDto {

    @Data
    public static class Request {
        String groupAccountNo;
    }
}
