package de.fangfang.backend.model;

public record DeedDTO(
        String description,
        String address,
        String name,
        float lng,
        float lat,
        int karmaPoints,
        DeedStatus deedStatus,
        String author,
        String maker
) {

    public Deed withId(String id) {
        return new Deed(id, description, address, name, lng, lat, karmaPoints, DeedStatus.CREATED, author, maker);
    }
}
