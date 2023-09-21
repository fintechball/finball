package com.finball.mydata.dto.account;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class GetMemberAccountDto {

    @Data
    public static class Request {
        List<String> accountList;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        List<MemberAccountInfoDto> memberAccountList;
    }
}
