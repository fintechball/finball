package com.finball.mydata.dto.account;

import java.util.List;

import lombok.*;

@Data
public class GetAccountsDto {

    @Getter
    @ToString
    public static class Request {

        List<Long> bankCode;
    }

    @Builder
    @Getter
    public static class Response {

        List<AccountDto> userAccountList;
    }
}
