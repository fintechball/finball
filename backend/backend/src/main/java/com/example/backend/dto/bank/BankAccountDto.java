package com.example.backend.dto.bank;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BankAccountDto {

    private String bankName;
    private String bankImage;
    private Long bankCode;
    private String accountName;
    private String accountNumber;
    private LocalDateTime accountRegist;
    private LocalDateTime accountClose = null;

}
