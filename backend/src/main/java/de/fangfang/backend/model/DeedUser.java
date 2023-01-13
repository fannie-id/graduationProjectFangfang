package de.fangfang.backend.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record DeedUser(
        @Id
        String id,
        String name,
        String email,
        String password,
        List<String> givenDeeds,
        List<String> takenDeeds,
        Address address,
        int karmaPoints
) {
}
