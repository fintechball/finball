package com.finball.mydata.repository;

import com.finball.mydata.entity.TradeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeHistoryRepository extends JpaRepository<TradeHistory,Long> {

}
