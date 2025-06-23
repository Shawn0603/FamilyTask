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
        System.out.println("🟡 尝试登录用户: " + username);
        System.out.println("🧩 当前所有用户: " + userRepository.findAll());

        return userRepository.findByUsername(username)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        String token = jwtService.generateToken(user.getUsername());
                        System.out.println("🟢 登录成功，生成 JWT: " + token);
                        return token;
                    } else {
                        System.out.println("🔴 密码错误");
                        return "Invalid password";
                    }
                })
                .orElseGet(() -> {
                    System.out.println("🔴 用户不存在");
                    return "User not found";
                });
    }
}
