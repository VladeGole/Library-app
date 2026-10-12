package com.example.library_app.controller;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.ReviewRequestDto;
import com.example.library_app.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/secure")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal Jwt jwt,  @Valid @RequestBody ReviewRequestDto reviewRequestDto) throws SaveFailedException {
        String email = jwt.getClaimAsString("email");
        if (Objects.isNull(email)) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.createReview(email, reviewRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewByBook(@PathVariable Long id, @PageableDefault(page = 0, size = Integer.MAX_VALUE) Pageable pageable) throws  NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getAllByBookId(id, pageable));
    }

    @GetMapping("/secure/exists/book/{bookId}")
    public ResponseEntity<?> getReviewExistsByBook(@AuthenticationPrincipal Jwt jwt, @PathVariable Long bookId) throws NotFoundException {
        String email = jwt.getClaimAsString("email");

        if (Objects.isNull(email)) {
            email = jwt.getSubject();
        }
       return ResponseEntity.status(HttpStatus.OK).body(reviewService.existReviewByBook(email, bookId));
    }

    @DeleteMapping("/{id}")
    public void deleteReview(Long id) throws NotFoundException {
         reviewService.deleteReviewsById(id);
         ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}