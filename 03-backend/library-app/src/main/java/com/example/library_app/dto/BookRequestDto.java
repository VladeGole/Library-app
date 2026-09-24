package com.example.library_app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.openapitools.jackson.nullable.JsonNullable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookRequestDto {

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    private JsonNullable<String> description;

    @PositiveOrZero
    private Integer copies;

    @PositiveOrZero
    private Integer copiesAvailable;

    private JsonNullable<String> category;

    private JsonNullable<String> image;
}
