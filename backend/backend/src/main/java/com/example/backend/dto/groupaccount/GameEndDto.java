package com.example.backend.dto.groupaccount;

import java.util.HashMap;
import lombok.Data;

@Data
public class GameEndDto {

    @Data
    public static class Request {

        Long groupAccountHistoryId;
        HashMap<Long, Long> gameResult;
    }
}
