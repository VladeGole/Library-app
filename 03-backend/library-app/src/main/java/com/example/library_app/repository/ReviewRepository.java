package com.example.library_app.repository;

import com.example.library_app.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "SELECT r FROM Review r WHERE r.book.id = :bookId")
    Page<Review> findAllReviewByBookId(Long bookId, Pageable pageable);

    Optional<Review> findByUserEmailAndBook_Id(String userEmail, Long bookId);

}
