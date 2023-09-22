package com.example.backend.dto.groupaccount;

import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
public class AcceptGroupAccountDto {

    @Data
    public static class Request {

        private String id;
        private String accountNumber;
        private String bankName;

        public GroupAccountMember toGroupAccountMember(Member member, GroupAccount groupAccount) {
            long zero = 0;
            return GroupAccountMember.builder()
                    .toAccountNumber(this.accountNumber)
                    .bankName(this.bankName)
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

        public static AcceptGroupAccountDto.Response toAcceptGroupAccountDtoResponse(
                GroupAccount groupAccount) {
            return AcceptGroupAccountDto.Response.builder()
                    .accountName(groupAccount.getName())
                    .ownerName(groupAccount.getMember().getName())
                    .build();
        }
    }
}
