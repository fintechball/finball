package com.finball.mydata.dto.account;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;


@Builder
@Getter
@Data
public class AccountDto {

    private String bankName;
    private String bankImage;
    private String name;
    private String account;
    private Long balance;

    @Override
    public String toString() {
        return "AccountDto{" +
                "bankName='" + bankName + '\'' +
                ", bankImage='" + bankImage + '\'' +
                ", name='" + name + '\'' +
                ", account='" + account + '\'' +
                ", balance=" + balance +
                '}';
    }
}
