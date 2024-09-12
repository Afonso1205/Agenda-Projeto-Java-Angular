package com.fatec.contato.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.fatec.contato.entities.Contact;

import jakarta.transaction.Transactional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {

    @Query("SELECT DISTINCT c FROM Contact c " +
            "LEFT JOIN FETCH c.categories cc " +
            "LEFT JOIN FETCH c.addresses")
    List<Contact> findAllWithCategoriesAndAddresses();

    @Query("SELECT DISTINCT c FROM Contact c " +
    "LEFT JOIN FETCH c.categories cc " +
    "LEFT JOIN FETCH c.addresses " +
    "WHERE c.id = :id")
    Optional<Contact> findByIdWithCategoriesAndAddresses(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Contact c WHERE c.id = :contactId")
    void deleteContactById(@Param("contactId") Long contactId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Contact c WHERE c.id IN :contactIds")
    void deleteContactsByIds(List<Long> contactIds);

    boolean existsById(Long id);


}