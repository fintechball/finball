package com.finball.mydata.dto.account;

import com.finball.mydata.type.DealType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class TransferResponseDto {
    private String accountNumber;
    private DealType type;
}
