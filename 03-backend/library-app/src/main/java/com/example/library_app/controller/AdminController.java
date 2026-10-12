package com.example.library_app.controller;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.BookRequestDto;
import com.example.library_app.services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/secure/book")
    public ResponseEntity<?> createBook(@RequestBody @Valid BookRequestDto bookRequestDto, @AuthenticationPrincipal Jwt jwt) throws AccessDeniedException, SaveFailedException {
        List<String> roles = jwt.getClaimAsStringList("https://library-app.com/roles");
        String admin = !CollectionUtils.isEmpty(roles) ? roles.get(0) : null;
        if (admin == null || !admin.equals("admin")) {
            throw new AccessDeniedException("Administration page only");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createBook(bookRequestDto));
    }

    @PatchMapping("/secure/increase/book/{id}")
    public ResponseEntity<?> increaseBookQuantity(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) throws AccessDeniedException, SaveFailedException, NotFoundException {
        List<String> roles = jwt.getClaimAsStringList("https://library-app.com/roles");
        String admin = !CollectionUtils.isEmpty(roles) ? roles.get(0) : null;
        if (admin == null || !admin.equals("admin")) {
            throw new AccessDeniedException("Administration page only");
        }
        return ResponseEntity.status(HttpStatus.OK).body(adminService.increaseQuantityBook(id));
    }

    @PatchMapping("/secure/decrease/book/{id}")
    public ResponseEntity<?> decreaseBookQuantity(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) throws AccessDeniedException, SaveFailedException, NotFoundException {
        List<String> roles = jwt.getClaimAsStringList("https://library-app.com/roles");
        String admin = !CollectionUtils.isEmpty(roles) ? roles.get(0) : null;
        if (admin == null || !admin.equals("admin")) {
            throw new AccessDeniedException("Administration page only");
        }
        return ResponseEntity.status(HttpStatus.OK).body(adminService.decreaseQuantityBook(id));
    }

    @DeleteMapping("/secure/{id}")
    public ResponseEntity<?> deletedBook(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) throws AccessDeniedException, SaveFailedException, NotFoundException {
        List<String> roles = jwt.getClaimAsStringList("https://library-app.com/roles");
        String admin = !CollectionUtils.isEmpty(roles) ? roles.get(0) : null;
        if (admin == null || !admin.equals("admin")) {
            throw new AccessDeniedException("Administration page only");
        }
        adminService.deleteBookById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Reviews is deleted");
    }

}