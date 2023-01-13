package de.fangfang.backend.service;


import de.fangfang.backend.model.User;
import de.fangfang.backend.model.UserDTO;
import de.fangfang.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final IdGeneratorService idGeneratorService;


    public UserService(UserRepository userRepository, IdGeneratorService idGeneratorService) {
        this.userRepository = userRepository;
        this.idGeneratorService = idGeneratorService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );
        return new org.springframework.security.core.userdetails.User(user.username(), user.password(), List.of());
    }

    public User registerNewUser(UserDTO newUser) {
        String id = idGeneratorService.generateUuid();
        User userToSave = newUser.withIdWithEncode(id);
        return userRepository.save(userToSave);
    }

}
