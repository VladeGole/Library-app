package com.example.library_app.services;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.ReviewRequestDto;
import com.example.library_app.dto.ReviewResponseDto;
import com.example.library_app.mapper.ReviewMapper;
import com.example.library_app.model.Review;
import com.example.library_app.repository.BookRepository;
import com.example.library_app.repository.ReviewRepository;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.FileAlreadyExistsException;
import java.util.Objects;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    ReviewMapper reviewMapper;

    @Transactional(rollbackFor = { SaveFailedException.class, ConstraintViolationException.class })
    public ReviewResponseDto createReview(String userEmail, ReviewRequestDto reviewRequestDto) throws SaveFailedException {
        if (reviewRepository.findByUserEmailAndBook_Id(userEmail, reviewRequestDto.getBookId()).isPresent()) {
            throw new RuntimeException("Review already created");
        }
        Review review = reviewMapper.toEntity(reviewRequestDto, bookRepository);
        review.setUserEmail(userEmail);
        try {
           reviewRepository.saveAndFlush(review);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        return reviewMapper.toDto(review);
    }

    public Page<Review> getAllByBookId(Long bookId, Pageable pageable) throws NotFoundException {
        if (Objects.isNull(bookId)) {
            throw new NotFoundException("Book id is not found");
        }
        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return reviewRepository.findAllReviewByBookId(bookId, pageable);
    }

    public boolean existReviewByBook(String userEmail, Long bookId) throws NotFoundException {
        if (bookRepository.findById(bookId).isEmpty()) {
            throw new NotFoundException("Book doesnt exist");
        }
        return reviewRepository.findByUserEmailAndBook_Id(userEmail, bookId).isPresent();
    }

    @Transactional(rollbackFor = { NotFoundException.class })
    public void deleteReviewsById(Long id) throws NotFoundException {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new NotFoundException("Review id is not found"));
        reviewRepository.delete(review);
    }
}
