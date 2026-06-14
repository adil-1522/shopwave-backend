package com.shopwave.backend.repository;

import com.shopwave.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get all orders for a specific user
    List<Order> findByUserId(Long userId);

    // Get orders by status
    List<Order> findByStatus(Order.OrderStatus status);

    // Get orders for a user with specific status
    List<Order> findByUserIdAndStatus(Long userId, Order.OrderStatus status);

    // Get total revenue
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'DELIVERED'")
    Double getTotalRevenue();

    // Get order count by status
    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Long countByStatus(@Param("status") Order.OrderStatus status);
}
