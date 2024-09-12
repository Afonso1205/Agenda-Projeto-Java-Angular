package com.fatec.contato.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.contato.entities.Contact;
import com.fatec.contato.repositories.ContactRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAllWithCategoriesAndAddresses();
    }

    public Contact saveContact(Contact newContact) {
        if (newContact == null) {
            throw new IllegalArgumentException("Contact cannot be null");
        }
        return contactRepository.save(newContact);
    }

    @Transactional
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new EntityNotFoundException("Contact not found with ID: " + id);
        }
        contactRepository.deleteContactById(id);
    }

    @Transactional
    public void deleteContactsByIds(List<Long> contactIds) {
        for (Long id : contactIds) {
            if (!contactRepository.existsById(id)) {
                throw new EntityNotFoundException("Contact not found with ID: " + id);
            }
        }
        contactRepository.deleteContactsByIds(contactIds);
    }

    public Contact getContactById(Long id) {
        Optional<Contact> optionalContact = contactRepository.findByIdWithCategoriesAndAddresses(id);
        return optionalContact.orElse(null);
    }

    public Contact updateContact(Long id, Contact contact) {
        if (!contactRepository.existsById(id)) {
            throw new EntityNotFoundException("Contact not found with ID: " + id);
        }
        contact.setId(id);
        return contactRepository.save(contact);
    }
}