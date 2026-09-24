package com.example.library_app.core.exception;


public class SaveFailedException  extends Exception {

    public SaveFailedException(String message) {
        super(message);
    }

    public SaveFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
