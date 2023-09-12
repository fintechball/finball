package com.finball.mydata.repository;

import com.finball.mydata.entity.Account;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findAllByMemberIdAndCompanyIdIn(Long id, List<Long> bankList);
}
