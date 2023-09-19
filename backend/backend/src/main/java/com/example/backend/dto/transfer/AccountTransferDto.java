package com.example.backend.dto.transfer;

import lombok.Data;

@Data
public class AccountTransferDto {

    @Data
    public static class Request {
        private String name;
        private TransferInfoDto plusBank;
        private TransferInfoDto minusBank;
        private Long value;
    }
}
