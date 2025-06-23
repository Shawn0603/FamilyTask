package com.familytask.backend.auth;

import com.familytask.backend.entity.User;
import com.familytask.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "Username already exists";
        }

        User newUser = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();

        userRepository.save(newUser);
        return "User registered successfully";
    }
}
