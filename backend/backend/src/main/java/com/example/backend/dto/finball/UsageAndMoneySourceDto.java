package com.example.backend.dto.finball;

import com.example.backend.type.MoneySource;
import com.example.backend.type.Usage;
import java.util.ArrayList;
import lombok.Data;

@Data
public class UsageAndMoneySourceDto {

    @Data
    public static class Response{
        MoneySource[] moneySourceList;
        Usage[] usageList;
    }
}
