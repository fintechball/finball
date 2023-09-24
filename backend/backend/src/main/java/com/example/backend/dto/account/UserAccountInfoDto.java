package com.example.backend.dto.account;

import com.example.backend.entity.Account;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAccountInfoDto {

    private String bankName;
    private String bankImage;
    private String name;
    private String account;
    private Long balance;
    private boolean isFavorite;


    public static UserAccountInfoDto parseDto(Account account) {
        return UserAccountInfoDto.builder()
                .bankName(account.getCpName())
                .bankImage(account.getCpLogo())
                .name(account.getName())
                .account(account.getAccountNo())
                .balance(1000L)
                .build();
    }
}
