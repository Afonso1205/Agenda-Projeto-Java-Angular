package com.fatec.contato.mappers;

import com.fatec.contato.dto.CategoryRequest;
import com.fatec.contato.dto.CategoryResponse;
import com.fatec.contato.entities.Category;

public class CategoryMapper {

    public static Category toEntity(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.name());
        category.setColor(request.color());
        return category;
    }

    public static CategoryResponse toDTO(Category category) {

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getColor());
    }
}
