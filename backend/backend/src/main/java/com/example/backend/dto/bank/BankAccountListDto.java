package com.example.backend.dto.bank;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class BankAccountListDto {

    @Data
    @AllArgsConstructor
    public static class Request {
        List<Integer> bankCodeList;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        List<BankAccountInfo> bankAccountInfoList;
    }

}
