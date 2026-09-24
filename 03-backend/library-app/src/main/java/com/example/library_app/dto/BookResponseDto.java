package com.example.library_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponseDto {

    private Long id;

    private String title;

    private String author;

    private String description;

    private Integer copies;

    private Integer copiesAvailable;

    private String category;

    private String image;
}
