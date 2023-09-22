package com.example.backend.dto.transfer;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class AccountTransferDto {

    @Builder
    @Data
    public static class Request {
        private TransferInfoDto minusBank;
        private TransferInfoDto plusBank;
        private Long value;
    }

    @Data
    public static class Response {
        private List<FinBallTradeHistoryDto> list;
    }
}
