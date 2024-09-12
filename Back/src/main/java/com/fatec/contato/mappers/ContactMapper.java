package com.fatec.contato.mappers;

import com.fatec.contato.dto.ContactRequest;
import com.fatec.contato.dto.ContactResponse;
import com.fatec.contato.entities.Contact;

public class ContactMapper {

    public static Contact toEntity(ContactRequest request) {
        Contact contact = new Contact();
        contact.setName(request.name());
        contact.setPhone(request.phone());
        contact.setEmail(request.email());
        contact.setAddresses(request.addresses());
        contact.setBirthdate(request.birthdate());
        contact.setImage(request.image());
        contact.setCategories(request.categories());
        contact.setTheme(request.theme());
        contact.setInitial(request.initial());
        return contact;
    }

    public static ContactResponse toDTO(Contact contact) {
        return new ContactResponse(
                contact.getId(),
                contact.getName(),
                contact.getPhone(),
                contact.getEmail(),
                contact.getAddresses(),
                contact.getBirthdate(),
                contact.getImage(),
                contact.getCategories(),
                contact.getTheme(),
                contact.getInitial());
    }
}
