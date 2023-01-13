package de.fangfang.backend.model;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

public record UserDTO(
        String username,

        String password,
        String email,
        List<String> givenDeeds,
        List<String> takenDeeds,
        Address address,
        int karmaPoints
) {
        public User withIdWithEncode(String id) {
                List<String> givenDeeds = new ArrayList<>();
                List<String> takenDeeds = new ArrayList<>();
                String encodePassword = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8().encode(password);
                return new User(id, email, encodePassword, username, givenDeeds, takenDeeds, address, 0);
        }
}
