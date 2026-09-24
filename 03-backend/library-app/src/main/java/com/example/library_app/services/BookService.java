package com.example.library_app.services;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.BookRequestDto;
import com.example.library_app.dto.BookResponseDto;
import com.example.library_app.dto.ShelfResponse;
import com.example.library_app.mapper.BookMapper;
import com.example.library_app.model.Book;
import com.example.library_app.model.Checkout;
import com.example.library_app.repository.BookRepository;
import com.example.library_app.repository.CheckoutRepository;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.ValidationException;
import org.hibernate.annotations.DialectOverride;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private HistoryService historyService;

    @Transactional(rollbackFor = {ConstraintViolationException.class, ValidationException.class})
    public BookResponseDto createBook(BookRequestDto bookRequestDto) throws SaveFailedException {
        Book book = bookMapper.toEntity(bookRequestDto);
        try {
          bookRepository.saveAndFlush(book);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage(), e);
        }
        return bookMapper.toDto(book);
    }

    public Book getBookById(Long id) throws NotFoundException {
        return bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book doesnt exist"));
    }

    public BookResponseDto getBookResponseById(Long id) throws NotFoundException {
        Book book = getBookById(id);
        return bookMapper.toDto(book);
    }

    public Page<BookResponseDto> getAllBooks(String search, Pageable pageable) {
        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        Page<Book> bookPage = bookRepository.findAllWithSearch(search, pageable);
        List<BookResponseDto> bookResponseDtoList = bookMapper.toListBookResponseDto(bookPage.getContent());
        return new PageImpl<>(bookResponseDtoList, pageable, bookPage.getTotalElements());
    }

    @Transactional(rollbackFor = { NotFoundException.class, SaveFailedException.class })
    public BookResponseDto updateBookById(BookRequestDto bookRequestDto, Long id) throws NotFoundException, SaveFailedException {
        Book book = getBookById(id);
        bookMapper.merge(bookRequestDto, book);
        try {
            bookRepository.saveAndFlush(book);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        return bookMapper.toDto(book);
    }

    @Transactional(rollbackFor = {NotFoundException.class})
    public void deleteBookById(Long id) throws NotFoundException {
        Book book = getBookById(id);
        book.setDeleted(true);
        bookRepository.save(book);
    }

    @Transactional(rollbackFor = { NotFoundException.class})
    public Book checkoutBook(String userEmail, Long bookId) throws NotFoundException {
        Book book = getBookById(bookId);

        boolean existsCheckout = checkoutRepository.existsByUserEmailAndBookId_Id(userEmail, bookId);

        if (Objects.isNull(book) || existsCheckout || book.getCopiesAvailable() <= 0) {
            throw new NotFoundException("Book doesnt exist or book already");
        }

        Checkout checkout = Checkout.builder().checkoutDate(LocalDate.now())
                .returnDate(LocalDate.now().plusDays(7))
                .userEmail(userEmail)
                .bookId(book).build();

        checkoutRepository.save(checkout);
        book.setCopiesAvailable(book.getCopiesAvailable()-1);
        bookRepository.save(book);
        return book;
    }

    public List<Checkout> getAllCheckoutByEmail(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail);
    }

    public Integer countCheckout(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail).size();
    }

    public boolean isCheckout(String email, Long bookId) {
        return checkoutRepository.existsByUserEmailAndBookId_Id(email, bookId);
    }

    public  List<ShelfResponse> getCountsLoans(String userEmail) {
        List<Checkout> checkoutBooks = checkoutRepository.findByUserEmail(userEmail);

        LocalDate today = LocalDate.now();

        return checkoutBooks.stream().map(checkout -> {
            Book book = checkout.getBookId();
            long daysBetween = ChronoUnit.DAYS.between(today, checkout.getReturnDate());
            return ShelfResponse.builder().book(book).leftDays(daysBetween).build();
        }).toList();
    }

    @Transactional(rollbackFor = { NotFoundException.class, SaveFailedException.class, RuntimeException.class})
    public Book returnBook(String userEmail, Long id) throws NotFoundException, SaveFailedException {
        Book book = getBookById(id);
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId_Id(userEmail, id);
        if (Objects.isNull(checkout)) {
            throw new RuntimeException("This user not check out this book");
        }
        book.setCopiesAvailable(book.getCopiesAvailable() + 1);
        try {
            bookRepository.saveAndFlush(book);
            checkoutRepository.deleteById(checkout.getId());
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        historyService.createHistory(userEmail, book, checkout);
        return book;
    }

    @Transactional(rollbackFor = {NotFoundException.class, SaveFailedException.class, RuntimeException.class})
    public Checkout updateCheckoutBooks(String userEmail, Long bookId) throws SaveFailedException {
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId_Id(userEmail, bookId);

        if (Objects.isNull(checkout)) {
            throw new RuntimeException("This user not check out this book or book doesn`t exist");
        }

        LocalDate returnBookDate = checkout.getReturnDate();
        LocalDate now = LocalDate.now();
        LocalDate renewReturnBookDate = !returnBookDate.isBefore(now) ? now.plusDays(7) : returnBookDate;
        checkout.setReturnDate(renewReturnBookDate);
        try {
            checkoutRepository.saveAndFlush(checkout);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        return checkout;
    }

}
