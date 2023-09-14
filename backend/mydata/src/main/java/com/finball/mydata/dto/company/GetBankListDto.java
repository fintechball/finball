package com.finball.mydata.dto.company;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetBankListDto {

    @Data
    @Builder
    public static class Response {
        List<BankInfoDto> bankList;
    }
}
