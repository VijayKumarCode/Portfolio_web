package com.vijaykumar.portfolio.service;

import com.vijaykumar.portfolio.model.ContactRequest;
import com.vijaykumar.portfolio.entity.ContactMessage;
import com.vijaykumar.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public void saveMessage(ContactRequest request) {

        ContactMessage entity = new ContactMessage(
                request.name(),
                request.email(),
                request.message()
        );

        repository.save(entity);
    }
}