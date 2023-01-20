package de.fangfang.backend.controller;

import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<UserInfo> helloMe(Principal principal) {
        if (principal != null) {
            return new ResponseEntity<>(userService.getUserInfo(principal.getName()), HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.returnAnonymousUser(), HttpStatus.OK);
    }

    @PostMapping
    public void registerUser(@RequestBody UserRegistration newUser) {
        userService.registerNewUser(newUser);
    }

    @PostMapping("/login")
    public UserInfo login() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getUserInfo(username);
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

    @DeleteMapping("/{name}")
    public void deleteUser(@PathVariable String name, HttpSession httpSession) {
        userService.deleteUser(name);
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PutMapping("/validate/{username}")
    public void gainPoints(@RequestBody int points, @PathVariable String username) {
        userService.gainPoints(points, username);
    }

}
