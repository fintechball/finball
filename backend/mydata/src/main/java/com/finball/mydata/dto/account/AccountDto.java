package com.finball.mydata.dto.account;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {

    private String bankName;
    private String bankImage;
    private String name;
    private String account;
    private Long balance;

}
