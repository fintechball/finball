package com.example.backend.repository.accountbook;

import com.example.backend.entity.AccountBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountBookRepository extends JpaRepository<AccountBook, Long> {

}
