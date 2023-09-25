package com.finball.mydata.dto.account;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransferInfoDto {

    private Long companyId;
    private String accountNo;
    private String userName;
    private int balance;
}
