package com.familytask.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public").permitAll()  // Allow your API to be called
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                //.loginPage("/login")  // Login page 
                .defaultSuccessUrl("/api/private", true)  // Jump to the root directory after successful login
                .permitAll()
            )
            .logout(logout -> logout.permitAll());

        return http.build();
    }
}
