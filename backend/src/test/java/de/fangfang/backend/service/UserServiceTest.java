package de.fangfang.backend.service;

import de.fangfang.backend.exception.UsernameNotFoundException;
import de.fangfang.backend.model.Address;
import de.fangfang.backend.model.User;
import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.model.UserRegistration;
import de.fangfang.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

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

    UserService userService = new UserService(userRepo, idGeneratorService, argon2PasswordEncoder);

    @Test
    void loadUserByUsername_expect_MyUsernameNotFoundException() {
        when(userRepo.findByUsername("fangfang")).thenThrow(new UsernameNotFoundException("fangfang"));

        assertThrows(UsernameNotFoundException.class, () -> userRepo.findByUsername("fangfang"));
    }


    @Test
    void register_user_expect_success() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        UserRegistration userRegistration = new UserRegistration(
                "max",
                "max",
                "max@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0);
        when(idGeneratorService.generateUuid()).thenReturn("1");
        when(argon2PasswordEncoder.encode(userRegistration.password())).thenReturn("encode");

        User expected = new User(
                "1",
                "max",
                "encode",
                "max@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0);
        when(userRepo.save(expected)).thenReturn(expected);
        userService.registerNewUser(userRegistration);
        verify(userRepo).save(expected);
    }

    @Test
    void edit_user_expect_success() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        User userToSave = new User(
                "1",
                "max",
                "encode",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0);

        UserInfo expected = new UserInfo(
                "max",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0);

        when(userRepo.findByUsername("max")).thenReturn(Optional.of(userToSave));
        when(userRepo.save(userToSave)).thenReturn(userToSave);
        UserInfo result = userService.editUser(expected);
        assertEquals(result, expected);
    }

    @Test
    void edit_user_throw_exception() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();

        UserInfo expected = new UserInfo(
                "max",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0);

        when(userRepo.findByUsername("max")).thenThrow(UsernameNotFoundException.class);
        assertThrows(UsernameNotFoundException.class, () -> userService.editUser(expected));
    }

    @Test
    void delete_user_expect_success() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        UserInfo userToDelete = new UserInfo(
                "max",
                "max123@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0);
        User userToDeleteWID = new User(
                "1",
                userToDelete.username(),
                "encode",
                userToDelete.email(),
                userToDelete.givenDeeds(),
                userToDelete.takenDeeds(),
                userToDelete.address(),
                userToDelete.karmaPoints());


        when(userRepo.findByUsername("max")).thenReturn(Optional.of(userToDeleteWID));
        userService.deleteUser(userToDelete.username());
        verify(userRepo).deleteById(userToDeleteWID.id());

    }

}
