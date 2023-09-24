package com.finball.mydata.dto.account;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class GetMemberAccountDto {

    @Data
    public static class Request {
        List<String> accountList;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        List<BankAccountDto> bankAccountDtoList;
    }
}
