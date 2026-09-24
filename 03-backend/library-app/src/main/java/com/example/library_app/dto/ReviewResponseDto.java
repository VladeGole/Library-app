package com.example.library_app.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDto {

    private Long id;

    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDateTime localDateTime;

    private String userEmail;

    private Integer rating;

    private Long bookId;

    private String reviewDescription;

}
