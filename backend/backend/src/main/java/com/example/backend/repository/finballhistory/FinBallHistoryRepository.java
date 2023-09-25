package com.example.backend.repository.finballhistory;

import com.example.backend.entity.FinBallAccount;
import com.example.backend.entity.FinBallHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinBallHistoryRepository extends JpaRepository<FinBallHistory, Long> {

    List<FinBallHistory> findAllByFinBallAccount(FinBallAccount account);

    Optional<FinBallHistory> findByFinBallAccountAndId(FinBallAccount account, Long tradeHistoryId);
}
