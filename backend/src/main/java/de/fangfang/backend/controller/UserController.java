package de.fangfang.backend.controller;

import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.service.UserService;
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
        return "Hello " + principal.getName();
    }

    @PostMapping
    public void registerUser(@RequestBody UserRegistration newUser) {
        userService.registerNewUser(newUser);
    }

    @PostMapping
    public String login() {
        return "ok";
    }
}
