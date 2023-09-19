package com.example.backend.dto.mydata.transfer;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MydataAccountTransferDto {
    private List<TransferResponseDto> list;
}
