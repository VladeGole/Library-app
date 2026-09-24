package com.example.library_app.controller;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.AdminMessageRequestDto;
import com.example.library_app.dto.MessageRequestDto;
import com.example.library_app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/secure/create")
    public ResponseEntity<?> createMessage(@RequestBody MessageRequestDto messageRequestDto, @AuthenticationPrincipal Jwt jwt) throws SaveFailedException {
        String email = jwt.getClaimAsString("email");
        if (Objects.isNull(email)) {
            email = jwt.getSubject();
        }
        messageService.createMessage(messageRequestDto, email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/secure/all")
    public ResponseEntity<?> getMessage(@AuthenticationPrincipal Jwt jwt, @PageableDefault(page=0, size = Integer.MAX_VALUE) Pageable pageable) {
        String email = jwt.getClaimAsString("email");
        if (Objects.isNull(email)) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(messageService.getAllMessageByUserEmail(email, pageable));
    }

    @GetMapping("/secure/close")
    public ResponseEntity<?> getMessageWithClose(@AuthenticationPrincipal Jwt jwt, @PageableDefault(page=0, size = Integer.MAX_VALUE) Pageable pageable) {
        String email = jwt.getClaimAsString("email");
        if (Objects.isNull(email)) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(messageService.getAllMessageWithClose(email, pageable));
    }

    @PutMapping("/secure/admin/message")
    public ResponseEntity<?> updateMessageWithResponse(@RequestBody AdminMessageRequestDto adminMessageRequestDto, @AuthenticationPrincipal Jwt jwt) throws SaveFailedException, NotFoundException {
        String email = jwt.getClaimAsString("email");
        if (Objects.isNull(email)) {
            email = jwt.getSubject();
        }
        messageService.createAdminMessage(adminMessageRequestDto, email);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Message is update");
    }


}
