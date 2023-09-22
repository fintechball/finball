package com.example.backend.dto.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OppositeBankDto {
    private String bankName;
    private String account;
    private String target;
    private String nickname;
}
