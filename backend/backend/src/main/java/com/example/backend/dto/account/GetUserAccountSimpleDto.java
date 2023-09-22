package com.example.backend.dto.account;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class GetUserAccountSimpleDto {

    @Data
    @AllArgsConstructor
    public static class Response {
        List<UserAccountSimpleDto> userAccountSimpleList;
    }

}
