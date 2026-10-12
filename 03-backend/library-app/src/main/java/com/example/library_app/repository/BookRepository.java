package com.example.library_app.repository;

import com.example.library_app.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b FROM Book b WHERE b.deleted=false AND (:search is NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%'))"
        + " OR LOWER(b.category) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Book> findAllWithSearch(String search, Pageable pageable);
}