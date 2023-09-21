package com.finball.mydata.dto.account;

import java.util.List;

import lombok.*;

@Data
public class BankAccountListDto {

    @Getter
    @ToString
    public static class Request {

        List<Long> bankCodeList;
    }

    @Builder
    @Getter
    public static class Response {

        List<BankAccountDto> bankAccountList;
    }
}
