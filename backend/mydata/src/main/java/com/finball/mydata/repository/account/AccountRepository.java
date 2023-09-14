package com.finball.mydata.repository.account;

import com.finball.mydata.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
