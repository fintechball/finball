package com.example.backend.dto.mydata;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberAccountInfoDto {

    private String accountNo;
    private Long balance;
    private String name;
    private LocalDateTime accountRegist;
    private CompanyInfoForMemberDto company;
    private boolean isFavorite;

    public void setIsFavorite(boolean isFavorite){
        this.isFavorite = isFavorite;
    }
}