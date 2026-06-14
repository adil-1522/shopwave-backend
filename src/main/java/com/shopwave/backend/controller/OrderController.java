package com.shopwave.backend.controller;

import com.shopwave.backend.model.Order;
import com.shopwave.backend.model.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.shopwave.backend.service.OrderService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Place a new order
    @PostMapping("/user/{userId}")
    public ResponseEntity<Order> placeOrder(
            @PathVariable Long userId,
            @RequestBody List<OrderItem> orderItems) {
        return ResponseEntity.ok(orderService.placeOrder(userId, orderItems));
    }

    // Get all orders for a user
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getUserOrders(userId);
    }

    // Get order by id
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        Order.OrderStatus status = Order.OrderStatus.valueOf(request.get("status"));
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    // Get total revenue
    @GetMapping("/revenue")
    public ResponseEntity<Double> getTotalRevenue() {
        return ResponseEntity.ok(orderService.getTotalRevenue());
    }
}
