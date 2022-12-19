package de.fangfang.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Deeds")
public record Deed(
        @Id
        String id,
        String description,
        Address address,
        int karmaPoints
) {
        Deed(
                String description,
                Address address,
                int karmaPoints
        ) {
                this(null, description, address, karmaPoints);
        }


        public Deed withId(String id) {
                return new Deed(id, description, address, karmaPoints);
        }

}

