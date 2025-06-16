package com.familytask.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/public")
    public String publicEndpoint() {
        return "This is a public interface, no login required";
    }

    @GetMapping("/api/private")
    public String privateEndpoint() {
        return "This is a protected interface. You can only see it after logging in.";
    }
}

