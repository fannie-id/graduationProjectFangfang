package de.fangfang.backend.model;

import java.util.List;

public record UserInfo(
        String username,
        String email,
        List<String> givenDeeds,
        List<String> takenDeeds,
        Address address,
        int karmaPoints
) {
}
