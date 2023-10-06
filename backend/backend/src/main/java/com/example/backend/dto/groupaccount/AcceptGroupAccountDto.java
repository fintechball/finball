package com.example.backend.dto.groupaccount;

import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
public class AcceptGroupAccountDto {

    @Data
    public static class Request {

        private String url;

        public GroupAccountMember toGroupAccountMember(Member member, GroupAccount groupAccount, FinBallAccount finBallAccount) {
            long zero = 0;
            String cpName = "핀볼";
            return GroupAccountMember.builder()
                    .toAccountNo(finBallAccount.getAccountNo())
                    .cpName(cpName)
                    .value(zero)
                    .balance(zero)
                    .skinId(zero)
                    .member(member)
                    .groupAccount(groupAccount)
                    .build();
        }
    }

    @Builder
    @Data
    public static class Response {

        private String ownerName;
        private String accountName;
        private String accountNo;

        public static AcceptGroupAccountDto.Response toAcceptGroupAccountDtoResponse(
                GroupAccount groupAccount) {
            return AcceptGroupAccountDto.Response.builder()
                    .accountName(groupAccount.getName())
                    .accountNo(groupAccount.getAccountNo())
                    .ownerName(groupAccount.getMember().getName())
                    .build();
        }
    }
}
