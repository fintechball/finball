package com.example.backend.repository.category;

import com.example.backend.entity.Category;
import com.example.backend.entity.FinBallAccount;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    ArrayList<Category> findAllByFinBallAccount(FinBallAccount account);
}
