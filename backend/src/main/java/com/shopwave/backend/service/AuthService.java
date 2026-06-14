package com.shopwave.backend.service;

import com.shopwave.backend.exception.BadRequestException;
import com.shopwave.backend.exception.UnauthorizedException;
import com.shopwave.backend.model.User;
import com.shopwave.backend.repository.UserRepository;
import com.shopwave.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.shopwave.backend.exception.BadRequestException;
import com.shopwave.backend.exception.ResourceNotFoundException;
import com.shopwave.backend.exception.UnauthorizedException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("Email already registered: " + email);
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(User.Role.CUSTOMER);

        userRepository.save(user);
        return jwtUtil.generateToken(email, User.Role.CUSTOMER.name());
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UnauthorizedException("Invalid password");
        }

        return jwtUtil.generateToken(email, user.getRole().name());
    }
}