package com.example.backend.dto.account;

import com.example.backend.entity.Account;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAccountSimpleDto {

    private String bankName;
    private String bankImage;
    private String name;
    private String account;
    private boolean isFavorite;

    public static UserAccountSimpleDto parseDto(Account account) {
        return UserAccountSimpleDto.builder()
                .bankName(account.getCpName())
                .bankImage(account.getCpLogo())
                .name(account.getName())
                .account(account.getAccountNumber())
                .isFavorite(account.isFavorite())
                .build();
    }

}
