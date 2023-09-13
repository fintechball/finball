package com.finball.mydata.repository;

import com.finball.mydata.entity.Account;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT a FROM Account a JOIN FETCH a.member WHERE a.member.id = :memberId AND a.company.id IN :companyIds")
    List<Account> findAllByMemberIdAndCompanyIdInWithFetchJoin(@Param("memberId") long memberId,
            @Param("companyIds") List<Long> companyIds);
}
