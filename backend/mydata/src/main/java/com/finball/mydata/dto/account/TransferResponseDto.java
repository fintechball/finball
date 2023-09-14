package com.finball.mydata.dto.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class TransferResponseDto {
    private String accountNumber;
    private String type;
}
