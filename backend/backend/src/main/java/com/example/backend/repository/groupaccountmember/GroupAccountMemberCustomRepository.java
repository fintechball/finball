package com.example.backend.repository.groupaccountmember;

import static com.example.backend.entity.QGroupAccount.groupAccount;
import static com.example.backend.entity.QGroupAccountMember.groupAccountMember;
import static com.example.backend.entity.QMember.member;

import com.example.backend.entity.Account;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.GroupAccountMember;
import com.example.backend.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class GroupAccountMemberCustomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public GroupAccountMemberCustomRepository(JPAQueryFactory queryFactory) {
        super(GroupAccountMember.class);
        this.queryFactory = queryFactory;
    }

    public List<GroupAccountMember> getGroupAccountMemberWithMembers(String groupAccountNo) {
        List<GroupAccountMember> result = queryFactory
                .selectFrom(groupAccountMember)
                .join(groupAccountMember.member, member).fetchJoin()
                .where(groupAccountMember.groupAccount.accountNo.eq(groupAccountNo))
                .fetch();
        return result;
    }

    public GroupAccountMember getGroupAccountMemberWithMemberAndGroupAccount(Long memberId,
            String groupAccountNo) {
        GroupAccountMember result = queryFactory
                .selectFrom(groupAccountMember)
                .where(groupAccountMember.member.id.eq(memberId)
                        .and(groupAccount.accountNo.eq(groupAccountNo)))
                .fetchOne();
        return result;
    }

    public GroupAccountMember findByGroupAccountNoAndMemberId(String groupAccountNo,
            Long memberId) {
        GroupAccountMember result = queryFactory
                .selectFrom(groupAccountMember)
                .where(groupAccountMember.member.id.eq(memberId)
                        .and(groupAccountMember.groupAccount.accountNo.eq(groupAccountNo)))
                .fetchOne();
        return result;
    }
}
