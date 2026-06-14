package com.shopwave.backend.dto;

import com.shopwave.backend.model.Cart;
import com.shopwave.backend.model.CartItem;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CartResponse {

    private Long id;
    private List<CartItemResponse> items;
    private Double totalPrice;

    @Data
    public static class CartItemResponse {
        private Long id;
        private Long productId;
        private String productName;
        private Double productPrice;
        private Integer quantity;
        private Double subtotal;
    }

    public static CartResponse fromCart(Cart cart) {
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setTotalPrice(cart.getTotalPrice());
        response.setItems(cart.getItems().stream()
                .map(item -> {
                    CartItemResponse itemResponse = new CartItemResponse();
                    itemResponse.setId(item.getId());
                    itemResponse.setProductId(item.getProduct().getId());
                    itemResponse.setProductName(item.getProduct().getName());
                    itemResponse.setProductPrice(item.getProduct().getPrice());
                    itemResponse.setQuantity(item.getQuantity());
                    itemResponse.setSubtotal(item.getProduct().getPrice() * item.getQuantity());
                    return itemResponse;
                })
                .collect(Collectors.toList()));
        return response;
    }
}
