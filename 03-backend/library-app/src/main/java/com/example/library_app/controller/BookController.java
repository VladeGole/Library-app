package com.example.library_app.controller;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.BookRequestDto;
import com.example.library_app.services.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("")
    public ResponseEntity<?> createBook(@Valid @RequestBody BookRequestDto bookRequestDto) throws SaveFailedException {
        return  ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(bookRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getBookResponseById(id));
    }

    @GetMapping
    public ResponseEntity<?> getAllBook(@RequestParam(required = false) String search, @PageableDefault(page = 0, size = Integer.MAX_VALUE) Pageable pageable ) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllBooks(search, pageable));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDto bookRequestDto) throws SaveFailedException, NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.updateBookById(bookRequestDto, id));
    }

   @PatchMapping("/secure/checkout/{id}")
    public ResponseEntity<?> checkoutByBookId(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) throws NotFoundException {
       String email = jwt.getClaimAsString("email");

       if (email == null || email.isBlank()) {
           email = jwt.getSubject();
       }
        return ResponseEntity.status(HttpStatus.OK).body(bookService.checkoutBook(email, id));
    }

    @GetMapping("/secure/checkout")
    public ResponseEntity<?> getCheckoutByEmail(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllCheckoutByEmail(email));
    }

    @GetMapping("/secure/checkout/count")
    public ResponseEntity<?> getCheckoutCountByEmail(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");

        if (email == null || email.isBlank()) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(bookService.countCheckout(email));
    }

    @GetMapping("/secure/isCheckout/{bookId}")
    public ResponseEntity<?> getCheckoutCountByEmailAndBookId(@AuthenticationPrincipal Jwt jwt, @PathVariable Long bookId) {
        String email = jwt.getClaimAsString("email");

        if (email == null || email.isBlank()) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(bookService.isCheckout(email, bookId));
    }

    @GetMapping("/secure/countLoans")
    public ResponseEntity<?> getCountLoans(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaimAsString("email");

        if (email == null || email.isBlank()) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getCountsLoans(email));
     }

    @PatchMapping("/secure/returnBook/{bookId}")
    public ResponseEntity<?> updateBookAvailableCopies(@AuthenticationPrincipal Jwt jwt, @PathVariable Long bookId) throws SaveFailedException, NotFoundException {
         String email = jwt.getClaimAsString("email");

         if (email == null || email.isBlank()) {
             email = jwt.getSubject();
         }
         return ResponseEntity.status(HttpStatus.OK).body(bookService.returnBook(email, bookId));
     }

    @PatchMapping("/secure/returnBookDate/{bookId}")
    public ResponseEntity<?> updateCheckoutBook(@AuthenticationPrincipal Jwt jwt, @PathVariable Long bookId) throws SaveFailedException {
        String email = jwt.getClaimAsString("email");

        if (email == null || email.isBlank()) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(bookService.updateCheckoutBooks(email, bookId));
    }
}