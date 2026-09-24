package com.example.library_app.repository;

import com.example.library_app.model.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    Page<History> findAllByUserEmail(String userEmail, Pageable pageable);
}
