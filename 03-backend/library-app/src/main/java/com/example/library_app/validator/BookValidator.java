package com.example.library_app.validator;

import com.example.library_app.dto.BookRequestDto;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Component
@Validated
public class BookValidator {

    public void validateBookRequestDto (@Valid BookRequestDto bookRequestDto) {

    }

}
