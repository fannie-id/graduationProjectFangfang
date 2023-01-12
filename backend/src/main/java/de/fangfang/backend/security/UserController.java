package de.fangfang.backend.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("me")
    public String helloMe(Principal principal) {
        return "Hello" + principal.getName();
    }
}
