package de.fangfang.backend.model;

import java.util.ArrayList;
import java.util.List;

public record UserRegistration(
        String username,
        String password,
        String email,
        List<String> givenDeeds,
        List<String> takenDeeds,
        Address address,
        int karmaPoints
) {
    public User createUserWithId(String id) {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        Address emptyAddress = new Address("", "", "", "", "");
        return new User(id, username, password, email, givenDeeds, takenDeeds, emptyAddress, 0);
    }
}
