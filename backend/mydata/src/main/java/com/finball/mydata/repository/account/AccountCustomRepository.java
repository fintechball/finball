package com.finball.mydata.repository.account;

import static com.finball.mydata.entity.QAccount.account;

import com.finball.mydata.entity.Account;
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
}
