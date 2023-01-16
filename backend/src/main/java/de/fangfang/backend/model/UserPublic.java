package de.fangfang.backend.model;

import java.util.List;

public record UserPublic(
        String username,
        List<String> givenDeeds,
        List<String> takenDeeds,
        Address address,
        int karmaPoints
) {
}
