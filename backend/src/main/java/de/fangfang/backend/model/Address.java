package de.fangfang.backend.model;


public record Address(
        String street,
        String id,
        String zip,
        String city,
        String name
) {
}
