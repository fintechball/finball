package com.example.backend.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PointDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        int point;
    }

}
