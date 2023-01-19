package de.fangfang.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fangfang.backend.model.Address;
import de.fangfang.backend.model.User;
import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.repository.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext
class UserControllerTest {
    private final String userEndPoint = "/api/users";

    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "max")
    @DirtiesContext
    void hello_me_test() throws Exception {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                address,
                0
        ));
        mvc.perform(get(userEndPoint + "/me"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void hello_me_test_withoutLogin() throws Exception {
        mvc.perform(get(userEndPoint + "/me"))
                .andExpect(status().is(404));
    }

    @Test
    @DirtiesContext
    void creat_user_get_200() throws Exception {
        mvc.perform(post(userEndPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username":"max",
                                "password": "max",
                                "email": "max@max.de",
                                "givenDeeds": [],
                                "takenDeeds": [],
                                "address":{
                                    "street": "wallstreet",
                                    "houseNumber": "2",
                                    "zip": "48939",
                                    "city": "New York City",
                                    "name": "Fangfang"
                                },
                                "karmaPoints":0
                                }
                                """).with(csrf())
                )
                .andExpect(status().isOk());
    }

    @WithMockUser(username = "max")
    @DirtiesContext
    @Test
    void login_expect_200() throws Exception {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                address,
                0
        ));
        mvc.perform(post(userEndPoint + "/login").with(csrf()))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @DirtiesContext
    @Test
    void logout_expect_200() throws Exception {
        mvc.perform(post(userEndPoint + "/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @WithMockUser
    @DirtiesContext
    @Test
    void edit_user_get_200() throws Exception {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                address,
                0
        ));

        MvcResult mvcResult = mvc.perform(put(userEndPoint + "/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username":"max",
                                "email": "max@max.de",
                                "givenDeeds": [],
                                "takenDeeds": [],
                                "address":{
                                    "street": "wallstreet",
                                    "houseNumber": "2",
                                    "zip": "48939",
                                    "city": "New York City",
                                    "name": "Fangfang"
                                },
                                "karmaPoints":0
                                }
                                """).with(csrf())
                )
                .andExpect(status().isOk())
                .andReturn();
        UserInfo expected = new UserInfo(
                "max",
                "max@max.de",
                givenDeeds,
                takenDeeds,
                address,
                0
        );
        UserInfo result = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), UserInfo.class);
        Assertions.assertEquals(expected, result);
    }

    @WithMockUser
    @DirtiesContext
    @Test
    void delete_user_get_200() throws Exception {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                address,
                0
        ));

        mvc.perform(delete(userEndPoint + "/max").with(csrf()))
                .andExpect(status().isOk());
    }
}
