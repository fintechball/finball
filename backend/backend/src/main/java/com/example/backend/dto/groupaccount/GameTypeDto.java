package com.example.backend.dto.groupaccount;

import com.example.backend.type.GameType;
import lombok.Data;

@Data
public class GameTypeDto {

    @Data
    public static class Response{
        GameType[] gameTypeList;
    }
}
