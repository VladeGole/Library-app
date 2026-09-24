package com.example.library_app.services;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.BookRequestDto;
import com.example.library_app.dto.BookResponseDto;
import com.example.library_app.mapper.BookMapper;
import com.example.library_app.model.Book;
import com.example.library_app.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class AdminService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    @Transactional(rollbackFor = {SaveFailedException.class})
    public BookResponseDto createBook(BookRequestDto bookRequestDto) throws SaveFailedException {

        if (Objects.isNull(bookRequestDto)) {
            throw new IllegalArgumentException("BookRequestDto don`t must be null");
        }
        Book book = bookMapper.toEntity(bookRequestDto);
        try {
            bookRepository.saveAndFlush(book);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        return bookMapper.toDto(book);
    }

    @Transactional(rollbackFor = {NotFoundException.class, SaveFailedException.class})
    public BookResponseDto increaseQuantityBook(Long id) throws NotFoundException, SaveFailedException {
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book with " + id + "not found"));
        book.setCopiesAvailable(book.getCopiesAvailable() + 1);
        book.setCopies(book.getCopies() + 1);

        try {
            bookRepository.saveAndFlush(book);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        return bookMapper.toDto(book);
    }

    @Transactional(rollbackFor = {NotFoundException.class, SaveFailedException.class})
    public BookResponseDto decreaseQuantityBook(Long id) throws NotFoundException, SaveFailedException {
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book with " + id + "not found"));

        if (book.getCopies() <= 0 || book.getCopiesAvailable() <= 0) {
            throw new IllegalArgumentException("You can`t decrease quantity because this book don`t have enough");
        }
        book.setCopiesAvailable(book.getCopiesAvailable() - 1);
        book.setCopies(book.getCopies() - 1);

        try {
            bookRepository.saveAndFlush(book);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
        return bookMapper.toDto(book);
    }
}
