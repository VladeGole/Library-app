package com.example.library_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckoutResponseDto {

    private Long id;

    private String userEmail;

    private LocalDate checkout;

    private LocalDate returnDate;

    private Long bookId;

}
