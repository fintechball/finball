package com.example.backend.dto.account;

import com.example.backend.entity.Account;
import com.example.backend.entity.Member;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AccountRegisterDto {

    @Data
    public static class Request {
        private int updateWeek;
        private List<AccountRegisterInfoDto> bankAccountList;
    }
}
