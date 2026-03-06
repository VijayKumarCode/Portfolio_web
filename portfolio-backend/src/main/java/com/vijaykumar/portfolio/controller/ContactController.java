package com.vijaykumar.portfolio.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vijaykumar.portfolio.model.ContactRequest;
import com.vijaykumar.portfolio.service.ContactService;
import com.vijaykumar.portfolio.dto.ApiResponse;

@CrossOrigin(origins = "https://vijaykumarcode.vercel.app")
@RestController
@RequestMapping("/api/v1")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> handleContact(
            @Valid @RequestBody ContactRequest request) {

        contactService.saveMessage(request);

        return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(new ApiResponse("SUCCESS", "Message stored successfully"));
    }

    @GetMapping("/test")
    public ResponseEntity<ApiResponse> test() {
        return ResponseEntity.ok(
            new ApiResponse("WORKING", "API is operational")
        );
    }
}