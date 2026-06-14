package com.shopwave.backend.controller;

import com.shopwave.backend.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        String token = authService.register(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        String token = authService.login(
                request.getEmail(),
                request.getPassword()
        );
        return ResponseEntity.ok(Map.of("token", token));
    }

    @Data
    static class RegisterRequest {
        @NotBlank(message = "Name cannot be empty")
        private String name;

        @NotBlank(message = "Email cannot be empty")
        @Email(message = "Please provide a valid email")
        private String email;

        @NotBlank(message = "Password cannot be empty")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;
    }

    @Data
    static class LoginRequest {
        @NotBlank(message = "Email cannot be empty")
        @Email(message = "Please provide a valid email")
        private String email;

        @NotBlank(message = "Password cannot be empty")
        private String password;
    }
}
