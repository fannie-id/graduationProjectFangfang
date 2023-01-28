package de.fangfang.backend.service;

import de.fangfang.backend.exception.UsernameNotFoundException;
import de.fangfang.backend.model.User;
import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UserServiceTest {
    UserRepo userRepo = mock(UserRepo.class);
    IdGeneratorService idGeneratorService = mock(IdGeneratorService.class);
    Argon2PasswordEncoder argon2PasswordEncoder = mock(Argon2PasswordEncoder.class);

    ImgUrlService imgUrlService = mock(ImgUrlService.class);

    UserService userService = new UserService(userRepo, idGeneratorService, argon2PasswordEncoder, imgUrlService);

    @Test
    void loadUserByUsername_expect_MyUsernameNotFoundException() {
        when(userRepo.findByUsername("fangfang")).thenThrow(new UsernameNotFoundException("fangfang"));

        assertThrows(UsernameNotFoundException.class, () -> userRepo.findByUsername("fangfang"));
    }


    @Test
    void register_user_expect_success() {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        UserRegistration userRegistration = new UserRegistration(
                "max",
                "max",
                "max@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");
        when(idGeneratorService.generateUuid()).thenReturn("1");
        when(argon2PasswordEncoder.encode(userRegistration.password())).thenReturn("encode");

        User expected = new User(
                "1",
                "max",
                "encode",
                "max@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");
        when(userRepo.save(expected)).thenReturn(expected);
        userService.registerNewUser(userRegistration);
        verify(userRepo).save(expected);
    }

    @Test
    void edit_user_expect_success() {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        User userToSave = new User(
                "1",
                "max",
                "encode",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");

        UserInfo expected = new UserInfo(
                "max",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");

        when(userRepo.findByUsername("max")).thenReturn(Optional.of(userToSave));
        when(userRepo.save(userToSave)).thenReturn(userToSave);
        UserInfo result = userService.editUser(expected);
        assertEquals(result, expected);
    }

    @Test
    void edit_user_throw_exception() {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();

        UserInfo expected = new UserInfo(
                "max",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");

        when(userRepo.findByUsername("max")).thenThrow(UsernameNotFoundException.class);
        assertThrows(UsernameNotFoundException.class, () -> userService.editUser(expected));
    }

    @Test
    void delete_user_expect_success() {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        UserInfo userToDelete = new UserInfo(
                "max",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");
        User userToDeleteWID = new User(
                "1",
                userToDelete.username(),
                "encode",
                userToDelete.email(),
                userToDelete.givenDeeds(),
                userToDelete.takenDeeds(),
                userToDelete.address(),
                userToDelete.name(),
                userToDelete.lng(),
                userToDelete.lat(),
                userToDelete.karmaPoints(),
                "");


        when(userRepo.findByUsername("max")).thenReturn(Optional.of(userToDeleteWID));
        userService.deleteUser(userToDelete.username());
        verify(userRepo).deleteById(userToDeleteWID.id());

    }

    @Test
    void gainPoints_expect_success() {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();

        User userOld = new User(
                "1",
                "max",
                "encode",
                "",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");
        User expected = new User(
                "1",
                "max",
                "encode",
                "",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                5,
                "");

        when(userRepo.findByUsername("max")).thenReturn(Optional.of(userOld));
        userService.gainPoints(5, "max");
        verify(userRepo).save(expected);

    }

    @Test
    void upload_img_expect_success() throws IOException {

        MultipartFile file = new MultipartFile() {
            @Override
            public String getName() {
                return null;
            }

            @Override
            public String getOriginalFilename() {
                return null;
            }

            @Override
            public String getContentType() {
                return null;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public long getSize() {
                return 0;
            }

            @Override
            public byte[] getBytes() {
                return new byte[0];
            }

            @Override
            public InputStream getInputStream() {
                return null;
            }

            @Override
            public void transferTo(File dest) throws IllegalStateException {

            }
        };

        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();

        User foundUser = new User(
                "1",
                "max",
                "encode",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                "");


        when(userRepo.findByUsername("max")).thenReturn(Optional.of(foundUser));
        String expected = "foto";
        when(imgUrlService.urlGenerator(file)).thenReturn(expected);

        when(userRepo.save(foundUser)).thenReturn(foundUser);
        String result = userService.uploadImg("max", file);
        assertEquals(expected, result);


    }

}
