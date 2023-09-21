package com.example.backend.dto.groupaccount;

import com.example.backend.type.DealType;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GroupTradeHistoryDto {

    private long id;
    private String name;
    private long value;
    private DealType type;
    private List<GroupGameResultDto> result;
}
