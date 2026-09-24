package com.example.library_app.repository;

import com.example.library_app.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findByUserEmail(String userEmail, Pageable pageable);

    Page<Message> findByCloseAndUserEmail(Boolean close, String userEmail, Pageable pageable);

}
