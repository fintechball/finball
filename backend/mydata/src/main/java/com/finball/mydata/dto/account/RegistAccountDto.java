package com.finball.mydata.dto.account;

import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor // 문제 2. 기본 생성자의 접근 제어자가 불명확함
@AllArgsConstructor
public class RegistAccountDto {

    private String accountNumber;
    private String originNumber;
    private LocalDateTime registerDt;
    private Long balance;
    private Long companyId;
    private String accountName;

    public Account toAccount(Member member, Company company) {
        System.out.println(company);
        return Account.builder()
                .accountNo(this.accountNumber)
                .originNo(this.originNumber)
                .createdAt(this.registerDt)
                .balance(this.balance)
                .name(this.accountName)
                .member(member)
                .company(company)
                .build();
    }
}
