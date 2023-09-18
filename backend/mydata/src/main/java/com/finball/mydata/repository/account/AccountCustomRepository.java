package com.finball.mydata.repository.account;

import static com.finball.mydata.entity.QAccount.account;

import com.finball.mydata.entity.Account;
import com.finball.mydata.entity.QAccount;
import com.finball.mydata.entity.QCompany;
import com.finball.mydata.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class AccountCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public AccountCustomRepository(JPAQueryFactory queryFactory) {
        super(Account.class);
        this.queryFactory = queryFactory;
    }

    public List<Account> findAllByMemberIdAndCompanyIdInWithFetchJoin(long memberId,
            List<Long> companyIds) {
        return queryFactory
                .selectFrom(account)
                .leftJoin(account.member).fetchJoin()
                .leftJoin(account.company).fetchJoin()
                .where(account.member.id.eq(memberId).and(account.company.id.in(companyIds)))
                .fetch();
    }


    public List<Account> findByAccountNo(String accountNo) {

        QAccount account = QAccount.account;
        QCompany company = QCompany.company;
        QMember member = QMember.member;

        return queryFactory
                .select(account)
                .from(account)
                .leftJoin(account.member, member) // 카드와 회사 조인
                .fetchJoin()
                .leftJoin(account.company, company) // 카드와 멤버 조인
                .fetchJoin()
                .where(account.accountNo.eq(accountNo))
                .orderBy(account.accountNo.asc())
                .fetch();

    }
}
