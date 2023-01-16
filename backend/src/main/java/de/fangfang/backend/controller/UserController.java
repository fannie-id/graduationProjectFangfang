package de.fangfang.backend.controller;

import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("me")
    public String helloMe(Principal principal) {
        if (principal != null) {
            return principal.getName();
        }
        return "anonymousUser";
    }

    @PostMapping
    public void registerUser(@RequestBody UserRegistration newUser) {
        userService.registerNewUser(newUser);
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
