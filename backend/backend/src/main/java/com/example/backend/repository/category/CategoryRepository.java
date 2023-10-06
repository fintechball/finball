package com.example.backend.repository.category;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    ArrayList<Category> findAllByFinBallAccount(FinBallAccount account);

    Optional<Category> findByName(String categoryName);

    Optional<Category> findByFinBallAccountAndName(FinBallAccount finBallAccount, String name);
}
