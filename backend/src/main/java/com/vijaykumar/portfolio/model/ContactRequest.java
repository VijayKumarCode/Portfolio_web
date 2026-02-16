package com.vijaykumar.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Message cannot be empty")
    @Size(min = 10, message = "Message must be at least 10 characters long")
    private String message;

    // Default Constructor
    public ContactRequest() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}