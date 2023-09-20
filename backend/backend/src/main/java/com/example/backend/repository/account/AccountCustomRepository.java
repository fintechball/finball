package com.example.backend.repository.account;

import com.example.backend.entity.Account;
import com.example.backend.entity.QAccount;
import com.example.backend.entity.QMember;
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

    public List<Account> findByIdOrderByIsFavorite(Long memberId) {
        QAccount account = QAccount.account;
        QMember member = QMember.member;

        return queryFactory.select(account)
                .from(account)
                .leftJoin(account.member, member).fetchJoin()
                .where(member.id.eq(memberId))
                .orderBy(account.isFavorite.desc())
                .fetch();
    }
}
