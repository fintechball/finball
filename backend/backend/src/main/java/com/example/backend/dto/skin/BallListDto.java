package com.example.backend.dto.skin;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class BallListDto {

    @Data
    @AllArgsConstructor
    public static class response {
        List<SkinDto> skin;
    }

}
