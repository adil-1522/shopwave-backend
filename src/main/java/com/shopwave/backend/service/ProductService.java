package com.shopwave.backend.service;

import com.shopwave.backend.model.Product;
import com.shopwave.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Get all products with pagination and sorting
    public Page<Product> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return productRepository.findAll(pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Product not found with id: " + id)
        );
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);
        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setPrice(updatedProduct.getPrice());
        existing.setStock(updatedProduct.getStock());
        existing.setImageUrl(updatedProduct.getImageUrl());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Search products by name
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }

    // Get products by max price
    public List<Product> getProductsByMaxPrice(Double price) {
        return productRepository.findByPriceLessThan(price);
    }

    // Get products by price range
    public List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceRange(minPrice, maxPrice);
    }

    // Get products by category
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    // Smart search by keyword
    public List<Product> smartSearch(String keyword) {
        return productRepository.searchByKeyword(keyword);
    }

    // Get out of stock products
    public List<Product> getOutOfStockProducts() {
        return productRepository.findOutOfStockProducts();
    }

    // Get all products sorted by price descending
    public Page<Product> getProductsSortedByPrice(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllOrderByPriceDesc(pageable);
    }
}
