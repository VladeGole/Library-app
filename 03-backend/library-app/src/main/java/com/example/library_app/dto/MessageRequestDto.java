package com.example.library_app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageRequestDto {

    @NotBlank
    private String title;

    @NotBlank
    private String question;

    private String adminEmail;

    private String response;

    private Boolean close;
}
