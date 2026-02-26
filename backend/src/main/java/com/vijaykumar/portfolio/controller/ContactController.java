package com.vijaykumar.portfolio.controller;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.vijaykumar.portfolio.model.ContactRequest;
import com.vijaykumar.portfolio.service.ContactService;

@RestController
@RequestMapping("/api/v1")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> handleContact(@Valid @RequestBody ContactRequest request, BindingResult result) {
        
        // Industry Standard: Map validation errors to a clean JSON object
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        contactService.saveMessage(request); 
        
        // Industry Standard: Return a structured JSON success response
        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("status", "success");
        successResponse.put("message", "Message saved to Ubuntu server log!");
        
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "WORKING");
        return ResponseEntity.ok(response);
    }
}