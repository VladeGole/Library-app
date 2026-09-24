package com.example.library_app.mapper;

import com.example.library_app.dto.BookRequestDto;
import com.example.library_app.dto.BookResponseDto;
import com.example.library_app.model.Book;
import org.mapstruct.*;
import org.openapitools.jackson.nullable.JsonNullable;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book toEntity(BookRequestDto bookRequestDto);

    BookResponseDto toDto(Book book);

    List<BookResponseDto> toListBookResponseDto(List<Book> book);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void merge (BookRequestDto bookRequestDto, @MappingTarget Book book);

    default String map(JsonNullable<String> value) {
        if (value == null || value.isUndefined()) {
            return null;
        }
        return value.orElse(null);
    }
}
