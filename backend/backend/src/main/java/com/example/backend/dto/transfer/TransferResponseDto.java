package com.example.backend.dto.transfer;

import com.example.backend.type.DealType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransferResponseDto {

    private String accountNumber;
    private DealType type;
    private String opAccountNumber;
    private String opBankName;
}