package com.finball.mydata.dto.account;

import com.finball.mydata.entity.Account;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberAccountInfoDto {

    private String accountNo;
    private Long balance;
    private String name;
    private LocalDateTime accountRegist;
    private CompanyInfoForMemberDto company;

    public static MemberAccountInfoDto parseDto(Account account) {
        CompanyInfoForMemberDto companyInfoForMemberDto = CompanyInfoForMemberDto.parseDto(
                account.getCompany());

        return MemberAccountInfoDto.builder()
                .accountNo(account.getAccountNo())
                .balance(account.getBalance())
                .name(account.getName())
                .accountRegist(account.getAccountRegist())
                .company(companyInfoForMemberDto)
                .build();
    }
}
