package com.finball.mydata.dto.company;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankInfo {

    String name;
    String image;
    Long code;
    boolean isConnected;

}
