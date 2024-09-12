package com.fatec.contato.dto;

import java.util.Set;
import com.fatec.contato.entities.Address;
import com.fatec.contato.entities.Category;

public record ContactResponse(
        Long id,
        String name,
        String phone,
        String email,
        Set<Address> addresses,
        String birthdate,
        String image,
        Set<Category> categories,
        String theme, 
        String initial) {
}