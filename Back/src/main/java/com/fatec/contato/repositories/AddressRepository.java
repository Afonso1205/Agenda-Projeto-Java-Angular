package com.fatec.contato.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.contato.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}