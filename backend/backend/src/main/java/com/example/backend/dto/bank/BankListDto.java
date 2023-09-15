package com.example.backend.dto.bank;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class BankListDto {

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<BankInfo> bankList;
    }

}
