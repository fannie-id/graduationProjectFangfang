package de.fangfang.backend.repository;

import de.fangfang.backend.model.Deed;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeedRepo extends MongoRepository<Deed, String> {

}
