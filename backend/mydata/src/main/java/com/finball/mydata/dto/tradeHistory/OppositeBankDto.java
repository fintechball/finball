package com.finball.mydata.dto.tradeHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OppositeBankDto {

    private String bankName;
    private String account;
    private String target;
    private String nickname;

}
