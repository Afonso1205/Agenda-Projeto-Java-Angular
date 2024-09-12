package com.fatec.contato.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fatec.contato.dto.CategoryRequest;
import com.fatec.contato.dto.CategoryResponse;
import com.fatec.contato.entities.Category;
import com.fatec.contato.mappers.CategoryMapper;
import com.fatec.contato.services.CategoryService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryResponse> getAllCategories() {
        List<Category> contacts = categoryService.getAllCategories();
        return contacts.stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest categoryRequest) {
        Category newCategory = categoryService.createCategory(categoryRequest);
        CategoryResponse categoryResponse = CategoryMapper.toDTO(newCategory);
        return ResponseEntity.ok(categoryResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
