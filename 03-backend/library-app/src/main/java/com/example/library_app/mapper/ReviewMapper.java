package com.example.library_app.mapper;

import com.example.library_app.dto.ReviewRequestDto;
import com.example.library_app.dto.ReviewResponseDto;
import com.example.library_app.model.Book;
import com.example.library_app.model.Review;
import com.example.library_app.repository.BookRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Objects;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "bookId", target = "book")
    Review toEntity(ReviewRequestDto reviewRequestDto, @Context BookRepository bookRepository);

    default Book map(Long id, @Context BookRepository bookRepository) {
       return Objects.nonNull(id) ? bookRepository.findById(id).orElse(null) : null;
    }

    @Mapping(source = "book.id", target = "bookId")
    ReviewResponseDto toDto(Review review);
}
