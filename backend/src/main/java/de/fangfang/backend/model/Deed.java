package de.fangfang.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("deeds")
public record Deed(
        //String id,
        String description,
        Address address,
        int karmaPoint
) {

}

