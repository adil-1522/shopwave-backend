package com.shopwave.backend.controller;

import com.shopwave.backend.dto.CartResponse;
import com.shopwave.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(CartResponse.fromCart(cartService.getOrCreateCart(userId)));
    }

    @PostMapping("/user/{userId}/add")
    public ResponseEntity<CartResponse> addToCart(
            @PathVariable Long userId,
            @RequestBody Map<String, Integer> request) {
        Long productId = request.get("productId").longValue();
        Integer quantity = request.get("quantity");
        return ResponseEntity.ok(CartResponse.fromCart(cartService.addToCart(userId, productId, quantity)));
    }

    @PutMapping("/user/{userId}/update")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable Long userId,
            @RequestBody Map<String, Integer> request) {
        Long productId = request.get("productId").longValue();
        Integer quantity = request.get("quantity");
        return ResponseEntity.ok(CartResponse.fromCart(cartService.updateCartItem(userId, productId, quantity)));
    }

    @DeleteMapping("/user/{userId}/remove/{productId}")
    public ResponseEntity<CartResponse> removeFromCart(
            @PathVariable Long userId,
            @PathVariable Long productId) {
        return ResponseEntity.ok(CartResponse.fromCart(cartService.removeFromCart(userId, productId)));
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
