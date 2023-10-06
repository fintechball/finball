package com.example.backend.dto.account;

import com.example.backend.dto.company.CompanyDto;
import com.example.backend.dto.yb.CompanyInfoDto;
import com.example.backend.entity.FinBallAccount;
import lombok.AllArgsConstructor;
        import lombok.Builder;
        import lombok.Data;
        import lombok.NoArgsConstructor;

public class GetOppositeAccountDto {

    @Data
    public static class Request {
        private Long code;
        private String originNo;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private OppositeAccountDto oppositeAccountDto;
    }

    public static Response toOppositeAccountDto(FinBallAccount finBallAccount) {

        CompanyInfoDto companyInfoDto = new CompanyInfoDto("핀볼", "https://s3-hotsix.s3.ap-northeast-2.amazonaws.com/images/%ED%95%80%EB%B3%BC.png", 106L, true);

        return Response.builder().oppositeAccountDto(new OppositeAccountDto(companyInfoDto, finBallAccount.getAccountNo(), finBallAccount.getMember().getName())).build();
    }

}
