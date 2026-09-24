package com.example.library_app.core.handler;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.ErrorResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalHandlerException {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalHandlerException.class);

    @ExceptionHandler(SaveFailedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleSaveFailedException(SaveFailedException saveFailedException) {
        LOGGER.error("SaveFailedException: ", saveFailedException);
        ErrorResponseDto errorResponse = new ErrorResponseDto();
        errorResponse.setLocalDateTime(LocalDateTime.now());
        errorResponse.setMessage(saveFailedException.getMessage());
        errorResponse.setError(HttpStatus.BAD_REQUEST.getReasonPhrase());
        return errorResponse;
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponseDto handleNotFoundException(NotFoundException notFoundException) {
        LOGGER.error("NotFoundException: ", notFoundException);
        ErrorResponseDto errorResponse = new ErrorResponseDto();
        errorResponse.setLocalDateTime(LocalDateTime.now());
        errorResponse.setMessage(notFoundException.getMessage());
        errorResponse.setError(HttpStatus.NOT_FOUND.getReasonPhrase());
        return errorResponse;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleSaveFailedException(MethodArgumentNotValidException methodArgumentNotValidException) {
        LOGGER.error("MethodArgumentNotValidException: ", methodArgumentNotValidException);
        ErrorResponseDto errorResponse = new ErrorResponseDto();
        errorResponse.setLocalDateTime(LocalDateTime.now());
        errorResponse.setMessage(methodArgumentNotValidException.getMessage());
        errorResponse.setError(HttpStatus.BAD_REQUEST.getReasonPhrase());
        return errorResponse;
    }


}
