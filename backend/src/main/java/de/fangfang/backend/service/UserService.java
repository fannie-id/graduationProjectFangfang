package de.fangfang.backend.service;


import de.fangfang.backend.model.User;
import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final IdGeneratorService idGeneratorService;
    private final Argon2PasswordEncoder passwordEncoder;


    public UserService(UserRepo userRepo, IdGeneratorService idGeneratorService, Argon2PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.idGeneratorService = idGeneratorService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );
        return new org.springframework.security.core.userdetails.User(user.username(), user.password(), List.of());
    }

    public UserInfo getUserPublic(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );
        return new UserInfo(user.username(), user.email(), user.givenDeeds(), user.takenDeeds(), user.address(), user.karmaPoints());
    }

    public void registerNewUser(UserRegistration newUser) {
        String encodedPassword = passwordEncoder.encode(newUser.password());
        UserRegistration userEncode = new UserRegistration(
                newUser.username(),
                encodedPassword,
                newUser.email(),
                newUser.givenDeeds(),
                newUser.takenDeeds(),
                newUser.address(),
                newUser.karmaPoints());

        String id = idGeneratorService.generateUuid();
        User userToSave = userEncode.createUserWithId(id);
        userRepo.save(userToSave);
    }

    public UserInfo editUser(UserInfo user) {
        User foundUser = userRepo.findByUsername(user.username())
                .orElseThrow(() ->
                        new UsernameNotFoundException(user.username())
                );
        User userToSave = new User(
                foundUser.id(),
                foundUser.username(),
                foundUser.password(),
                user.email(),
                user.givenDeeds(),
                user.takenDeeds(),
                user.address(),
                user.karmaPoints());
        userRepo.save(userToSave);
        return user;
    }
}
