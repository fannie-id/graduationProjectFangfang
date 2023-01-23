package de.fangfang.backend.model;

import java.util.ArrayList;
import java.util.List;

public record UserRegistration(
        String username,
        String password,
        String email,
        List<String> givenDeeds,
        List<String> takenDeeds,
        String address,
        String name,
        float lng,
        float lat,
        int karmaPoints
) {
    public User createUserWithId(String id) {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        return new User(id, username, password, email, givenDeeds, takenDeeds, "", "", 0.0F, 0.0F, 0);
    }
}
