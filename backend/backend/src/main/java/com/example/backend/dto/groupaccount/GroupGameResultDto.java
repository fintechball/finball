package com.example.backend.dto.groupaccount;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GroupGameResultDto {

    private String name;
    private long value;
}
