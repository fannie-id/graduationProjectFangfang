package de.fangfang.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("mongoUsers")
public record User(
        @Id
        String id,
        @Indexed(unique = true)
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
}
