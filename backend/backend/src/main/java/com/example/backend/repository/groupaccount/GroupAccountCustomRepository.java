package com.example.backend.repository.groupaccount;

import static com.example.backend.entity.QGroupAccount.groupAccount;
import static com.example.backend.entity.QGroupAccountHistory.groupAccountHistory;
import static com.example.backend.entity.QGroupAccountMember.groupAccountMember;
import static com.example.backend.entity.QGroupGameResult.groupGameResult;
import static com.example.backend.entity.QMember.member;

import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountHistory;
import com.example.backend.entity.GroupAccountMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class GroupAccountCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public GroupAccountCustomRepository(JPAQueryFactory queryFactory) {
        super(GroupAccount.class);
        this.queryFactory = queryFactory;
    }

    public GroupAccount getGroupAccountWithMembers(String groupAccountId) {
        GroupAccount result = queryFactory
                .selectFrom(groupAccount)
                .leftJoin(groupAccount.member, member).fetchJoin() // members를 함께 로드합니다.
                .where(groupAccount.accountNo.eq(groupAccountId))
                .fetch().get(0);
        return result;
    }

    public List<GroupAccountMember> getGroupAccountMemberListWithMembers(String groupAccountId) {
        List<GroupAccountMember> result = queryFactory
                .selectFrom(groupAccountMember)
                .join(groupAccountMember.groupAccount, groupAccount)
                .join(groupAccountMember.member, member).fetchJoin()
                .where(groupAccount.accountNo.eq(groupAccountId))
                .fetch();
        return result;
    }

    public List<GroupAccountHistory> getGroupAccountHistoryListWithGameResult(String groupAccountId) {
        List<GroupAccountHistory> result = queryFactory
                .select(groupAccountHistory)
                .distinct()
                .from(groupAccountHistory)
                .join(groupAccountHistory.games, groupGameResult).fetchJoin()
                .join(groupGameResult.groupAccountMember, groupAccountMember)
                .join(groupAccountMember.member, member)
                .where(groupAccountHistory.groupAccount.accountNo.eq(groupAccountId))
                .fetch();
        return result;
    }
}
