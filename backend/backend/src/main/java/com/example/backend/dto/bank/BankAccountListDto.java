package com.example.backend.dto.bank;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class BankAccountListDto {

    @Data
    public static class Request {
        private List<Long> bankCode;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<BankAccountInfo> bankAccountInfoList;
    }

}
