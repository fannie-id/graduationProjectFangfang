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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final IdGeneratorService idGeneratorService;
    private final Argon2PasswordEncoder passwordEncoder;
    private final ImgUrlService imgUrlService;

    public UserService(UserRepo userRepo, IdGeneratorService idGeneratorService, Argon2PasswordEncoder passwordEncoder, ImgUrlService imgUrlService) {
        this.userRepo = userRepo;
        this.idGeneratorService = idGeneratorService;
        this.passwordEncoder = passwordEncoder;
        this.imgUrlService = imgUrlService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );
        return new org.springframework.security.core.userdetails.User(user.username(), user.password(), List.of());
    }

    public UserInfo getUserInfo(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );
        return new UserInfo(user.username(), user.email(), user.givenDeeds(), user.takenDeeds(), user.address(), user.name(), user.lng(), user.lat(), user.karmaPoints(), user.img());
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
                newUser.name(),
                newUser.lng(),
                newUser.lat(),
                newUser.karmaPoints(),
                newUser.img());

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
                user.name(),
                user.lng(),
                user.lat(),
                user.karmaPoints(),
                user.img());
        userRepo.save(userToSave);
        return user;
    }

    public String uploadImg(String username, MultipartFile file) throws IOException {
        String imageUrl = "";
        if (file != null) {
            imageUrl = imgUrlService.urlGenerator(file);
        }
        User foundUser = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );
        User userToSave = new User(
                foundUser.id(),
                foundUser.username(),
                foundUser.password(),
                foundUser.email(),
                foundUser.givenDeeds(),
                foundUser.takenDeeds(),
                foundUser.address(),
                foundUser.name(),
                foundUser.lng(),
                foundUser.lat(),
                foundUser.karmaPoints(),
                imageUrl);

        userRepo.save(userToSave);
        return imageUrl;
    }


    public void deleteUser(String name) {
        User foundUser = userRepo.findByUsername(name)
                .orElseThrow(() ->
                        new UsernameNotFoundException(name)
                );

        userRepo.deleteById(foundUser.id());
    }

    public UserInfo returnAnonymousUser() {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        return new UserInfo("anonymousUser", "", givenDeeds, takenDeeds, "", "", 0.0F, 0.0F, 0, "");
    }

    public void gainPoints(int points, String username) {
        User foundUser = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username)
                );

        int newKP = foundUser.karmaPoints() + points;
        User userToSave = new User(
                foundUser.id(),
                foundUser.username(),
                foundUser.password(),
                foundUser.email(),
                foundUser.givenDeeds(),
                foundUser.takenDeeds(),
                foundUser.address(),
                foundUser.name(),
                foundUser.lng(),
                foundUser.lat(),
                newKP,
                foundUser.img());
        userRepo.save(userToSave);
    }
}
