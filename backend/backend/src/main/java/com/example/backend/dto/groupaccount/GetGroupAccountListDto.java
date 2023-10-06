package com.example.backend.dto.groupaccount;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GetGroupAccountListDto {

    @Builder
    @Data
    public static class Response {
        private List<GroupAccountListDto> groupAccountList;
    }
}
