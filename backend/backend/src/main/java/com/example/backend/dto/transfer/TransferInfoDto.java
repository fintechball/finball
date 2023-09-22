package com.example.backend.dto.transfer;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TransferInfoDto {
    private Long code;
    private String accountNumber;
    private String target;
    private Long balance;
}
