package com.example.library_app.services;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.model.Book;
import com.example.library_app.model.Checkout;
import com.example.library_app.model.History;
import com.example.library_app.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Transactional(rollbackFor = { NotFoundException.class, SaveFailedException.class })
    public void createHistory(String userEmail, Book book, Checkout checkout) throws NotFoundException, SaveFailedException {
        if (Objects.isNull(book) || Objects.isNull(checkout)) {
            throw new NotFoundException(" Book or checkout doesnt exist");
        }
        History history = History.builder().title(book.getTitle()).author(book.getAuthor()).img(book.getImage())
                .checkoutDate(checkout.getCheckoutDate()).returnDate(checkout.getReturnDate()).userEmail(userEmail)
                .description(book.getDescription()).build();
        try {
            historyRepository.saveAndFlush(history);
        } catch(Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
    }

    public Page<History> getAllHistory(String userEmail, Pageable pageable) {
        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return historyRepository.findAllByUserEmail(userEmail, pageable);
    }
}
