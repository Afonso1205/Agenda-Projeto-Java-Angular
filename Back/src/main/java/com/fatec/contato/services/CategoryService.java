package com.fatec.contato.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.contato.dto.CategoryRequest;
import com.fatec.contato.entities.Category;
import com.fatec.contato.repositories.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        
        return categoryRepository.findAll();
    }

    public Category createCategory(CategoryRequest categoryRequest) {
        if (categoryRequest == null) {
            throw new IllegalArgumentException("Category cannot be null");
        }

        Category category = new Category();
        category.setName(categoryRequest.name());
        category.setColor(categoryRequest.color());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
         if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found with ID: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
