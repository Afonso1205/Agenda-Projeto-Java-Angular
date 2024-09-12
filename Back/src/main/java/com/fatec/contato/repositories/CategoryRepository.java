package com.fatec.contato.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fatec.contato.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  
}