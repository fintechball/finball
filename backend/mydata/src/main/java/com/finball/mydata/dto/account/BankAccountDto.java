package com.finball.mydata.dto.account;


import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;


@Builder
@Getter
@Data
public class BankAccountDto {

    private String bankName;
    private String bankImage;
    private Long bankCode;
    private String accountName;
    private String accountNumber;
    private LocalDateTime accountRegist;
    private LocalDateTime accountClose;

}
