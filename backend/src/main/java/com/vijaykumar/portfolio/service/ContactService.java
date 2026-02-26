package com.vijaykumar.portfolio.service;

import com.vijaykumar.portfolio.model.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
public class ContactService {

    // Industry Standard: Use a proper Logger instead of System.out or System.err
    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);
    private static final String LOG_DIRECTORY = "logs";
    private static final String FILE_PATH = LOG_DIRECTORY + "/contact_messages.txt";

    public void saveMessage(ContactRequest request) {
        
        // Ensure the directory exists before trying to write to it
        File directory = new File(LOG_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        try (FileWriter writer = new FileWriter(FILE_PATH, true)) {
            writer.write("From: " + request.getName() + " [" + request.getEmail() + "]\n");
            writer.write("Message: " + request.getMessage() + "\n");
            writer.write("-------------------------------------------\n");
            
            logger.info("Successfully saved contact message from: {}", request.getEmail());
            
        } catch (IOException e) {
            // Log the error properly
            logger.error("Failed to save contact message to file. Error: {}", e.getMessage(), e);
        }
    }
}