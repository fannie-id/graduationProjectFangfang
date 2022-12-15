package de.fangfang.backend.model;

public record Deed(
        String id,
        String description,
        Address address,
        int karmaPoint
) {
    Deed(
            String description,
            Address address,
            int karmaPoint
    ) {
        this(null, description, address, karmaPoint);
    }

    public Deed withId(String id) {
        return new Deed(id, description, address, karmaPoint);
    }
}

