package de.fangfang.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Deeds")
public record Deed(
        @Id
        String id,
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

}

