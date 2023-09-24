package com.example.backend.dto.mydata;

import lombok.Data;

@Data
public class MyDataAuthDto {

    @Data
    public static class Request {
        private String name;
        private String registerNumber;
    }
}
