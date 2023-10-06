package com.example.backend.document.message;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAllByUserIdOrderByCreateAtAsc(Long userId);

}
