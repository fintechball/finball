package com.example.backend.dto.card;

import com.example.backend.dto.yb.CardInfoDto;
import com.example.backend.dto.yb.CompanyInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardDto {

    private CardInfoDto card;
    private CompanyInfoDto company;

}
