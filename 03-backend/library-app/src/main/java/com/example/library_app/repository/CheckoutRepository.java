package com.example.library_app.repository;

import com.example.library_app.model.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    boolean existsByUserEmailAndBookId_Id(String userEmail, Long bookId);

    Checkout findByUserEmailAndBookId_Id(String userEmail, Long bookId);

    List<Checkout> findByUserEmail(String userEmail);
}
