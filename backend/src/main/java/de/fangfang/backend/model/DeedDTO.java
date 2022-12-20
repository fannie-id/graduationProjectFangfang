package de.fangfang.backend.model;

public record DeedDTO(
        String description,
        Address address,
        int karmaPoints) {
}
