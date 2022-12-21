package de.fangfang.backend.model;


public record Address(
        String street,
        String houseNumber,
        String zip,
        String city,
        String name
) {
}
