package com.example.library_app.dto;

import com.example.library_app.model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShelfResponse {

    private Book book;

    private Long leftDays;
}
