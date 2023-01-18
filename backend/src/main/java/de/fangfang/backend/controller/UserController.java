package de.fangfang.backend.controller;

import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
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
    public UserInfo helloMe(Principal principal) {
        if (principal != null) {
            return userService.getUserPublic(principal.getName());
        }
        return null;
    }

    @PostMapping
    public void registerUser(@RequestBody UserRegistration newUser) {
        userService.registerNewUser(newUser);
    }

    @PostMapping("/login")
    public UserInfo login() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getUserPublic(username);
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "anonymousUser";
    }

    @PutMapping("/update")
    public UserInfo editUser(@RequestBody UserInfo user) {
        return userService.editUser(user);
    }

}
