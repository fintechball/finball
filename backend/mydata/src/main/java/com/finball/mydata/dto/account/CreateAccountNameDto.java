package com.finball.mydata.dto.account;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateAccountNameDto {
    private String accountNumber;
    private String originNumber;
}
