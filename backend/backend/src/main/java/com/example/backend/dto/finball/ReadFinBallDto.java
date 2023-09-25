package com.example.backend.dto.finball;

import lombok.Builder;
import lombok.Data;

@Data
public class ReadFinBallDto {

    @Builder
    @Data
    public static class Response {

        private FinBallAccountInfoDto account;
        private CompanyDto company;

        public void setCompany(Long finBallCode, String finBallLogo, String finBallName, Boolean connected) {
            this.company = CompanyDto.builder()
                    .code(finBallCode)
                    .name(finBallName)
                    .logo(finBallLogo)
                    .connected(connected)
                    .build();
        }
    }
}
