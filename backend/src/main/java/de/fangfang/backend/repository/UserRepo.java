package de.fangfang.backend.repository;

import de.fangfang.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);
}
