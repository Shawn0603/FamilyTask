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
    private final JwtService jwtService; 

    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public String register(String username, String password) {
        if (usernameExists(username)) {
            return "Username already exists";
        }

        User newUser = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();

        userRepository.save(newUser);
        return "User registered successfully";
    }

    public String login(String username, String password) {
        System.out.println("🟡 Try to log in a user: " + username);
        System.out.println("🧩 All current users: " + userRepository.findAll());

        return userRepository.findByUsername(username)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        String token = jwtService.generateToken(user.getUsername());
                        System.out.println("🟢 Login successful, generate JWT: " + token);
                        return token;
                    } else {
                        System.out.println("🔴 Wrong password");
                        return "Invalid password";
                    }
                })
                .orElseGet(() -> {
                    System.out.println("🔴 User does not exist");
                    return "User not found";
                });
    }
}
