package com.shopwave.backend.service;

import com.shopwave.backend.model.Category;
import com.shopwave.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Category not found with id: " + id)
        );
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
