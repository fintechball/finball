package com.finball.mydata.dto.account;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
public class GetAccountsDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        List<Long> bankList;
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        List<AccountDto> userAccountList;
    }
}
