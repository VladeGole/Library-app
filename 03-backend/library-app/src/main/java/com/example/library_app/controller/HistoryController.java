package com.example.library_app.controller;

import com.example.library_app.services.HistoryService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping
    public ResponseEntity<?> getAllHistory(@AuthenticationPrincipal Jwt jwt, @PageableDefault(page = 0, size = Integer.MAX_VALUE) Pageable pageable) {
        String email = jwt.getClaimAsString("email");

        if (StringUtils.isBlank(email)) {
            email = jwt.getSubject();
        }
        return ResponseEntity.status(HttpStatus.OK).body(historyService.getAllHistory(email, pageable));
    }
}
