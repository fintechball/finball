package com.example.backend.repository.bank;


import com.example.backend.entity.Account;
import com.example.backend.entity.QAccount;
import com.example.backend.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class BankCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public BankCustomRepository(JPAQueryFactory queryFactory) {
        super(Account.class);
        this.queryFactory = queryFactory;
    }

    public List<String> findCpCodeByMemberId(String userId) {

        QAccount account = QAccount.account;
//        QMember member = QMember.member;

        return queryFactory
                .selectDistinct(account.cpName)
                .from(account)
                .where(account.member.userId.eq(userId))
                .fetch();

    }

}
