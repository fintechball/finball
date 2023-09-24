package com.example.backend.dto.groupaccount;

import com.example.backend.entity.GroupAccount;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GroupAccountDto {

    @Builder
    @Data
    public static class Response {

        private long balance;
        private String accountNo;
        private List<GroupMemberDto> member;
        private List<GroupTradeHistoryDto> tradeHistory;

        public static GroupAccountDto.Response toGroupAccountDto(GroupAccount groupAccount,
                List<GroupMemberDto> member, List<GroupTradeHistoryDto> tradeHistory) {
            String accountNo = groupAccount.getAccountNo();
            long balance = groupAccount.getBalance();
            return Response
                    .builder()
                    .accountNo(accountNo)
                    .balance(balance)
                    .member(member)
                    .tradeHistory(tradeHistory)
                    .build();
        }
    }
}
