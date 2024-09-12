package com.fatec.contato.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fatec.contato.dto.ContactResponse;
import com.fatec.contato.entities.Contact;
import com.fatec.contato.mappers.ContactMapper;
import com.fatec.contato.services.ContactService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<ContactResponse> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return contacts.stream()
                .map(ContactMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact newContact = contactService.saveContact(contact);
        return ResponseEntity.ok(newContact);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteMultiple")
    public ResponseEntity<String> deleteMultipleContacts(@RequestBody List<Long> contactIds) {
        contactService.deleteContactsByIds(contactIds);
        return ResponseEntity.status(HttpStatus.OK).body("Contatos deletados com sucesso.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getContactById(@PathVariable Long id) {
        Contact contact = contactService.getContactById(id);
        if (contact == null) {
            return ResponseEntity.notFound().build();
        }
        ContactResponse contactResponse = ContactMapper.toDTO(contact);
        return ResponseEntity.ok(contactResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contact) {
        Contact updatedContact = contactService.updateContact(id, contact);
        return ResponseEntity.ok(updatedContact);
    }

}
