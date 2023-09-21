package com.example.backend.dto.mydata;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class GetMemberAccountDto {

    @Data
    @AllArgsConstructor
    public static class Request {
        List<String> accountList;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        List<MemberAccountInfoDto> memberAccountList;
    }
}
