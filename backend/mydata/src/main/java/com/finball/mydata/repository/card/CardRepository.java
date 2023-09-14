package com.finball.mydata.repository.card;

import com.finball.mydata.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, String> {

}
