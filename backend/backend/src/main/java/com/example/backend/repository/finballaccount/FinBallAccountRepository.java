package com.example.backend.repository.finballaccount;

import com.example.backend.entity.FinBallAccount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinBallAccountRepository extends JpaRepository<FinBallAccount, String> {

    Optional<FinBallAccount> findByMemberId(Long memberId);

}
