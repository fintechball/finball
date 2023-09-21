package com.example.backend.repository.groupaccounthistory;

import com.example.backend.entity.GroupAccountHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupAccountHistoryRepository extends JpaRepository<GroupAccountHistory, Long> {
    List<GroupAccountHistory> findByGroupAccount_AccountNumber(String groupAccountId);
}
