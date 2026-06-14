package com.shopwave.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotNull(message = "Price cannot be null")
    @Positive(message = "Price must be greater than 0")
    private Double price;

    @NotNull(message = "Stock cannot be null")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("products")
    private Category category;
}