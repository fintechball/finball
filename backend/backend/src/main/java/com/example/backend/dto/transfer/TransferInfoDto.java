package com.example.backend.dto.transfer;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TransferInfoDto {
    private Long companyId;
    private String accountNo;
    private String userName;
    private Long balance;
}
