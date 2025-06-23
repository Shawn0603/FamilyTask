package com.familytask.backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // 
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthenticationRequest request) {
        System.out.println("🟢 Registration request received: " + request.getUsername());
        String result = authService.register(request.getUsername(), request.getPassword());
        if (result.equals("User registered successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result); 
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        
        String result = authService.login(request.getUsername(), request.getPassword());

        if (result.startsWith("eyJ")) {
            
            return ResponseEntity.ok(new AuthenticationResponse(result));
        } else {
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
}
