package com.example.backend.dto.account;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class GetUserAccountDto {

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<UserAccountInfoDto> userAccountList;
    }
}
