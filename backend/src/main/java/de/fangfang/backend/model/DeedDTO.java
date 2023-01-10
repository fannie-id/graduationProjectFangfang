package de.fangfang.backend.model;

public record DeedDTO(
        String description,
        Address address,
        int karmaPoints,
        DeedStatus deedStatus
) {

    public Deed withId(String id) {
        return new Deed(id, description, address, karmaPoints, DeedStatus.CREATED);
    }
}
