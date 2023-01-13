package de.fangfang.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("me")
    public String helloMe(Principal principal) {
        return "Hello " + principal.getName();
    }
}
