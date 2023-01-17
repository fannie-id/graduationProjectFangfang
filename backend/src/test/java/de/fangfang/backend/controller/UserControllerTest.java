package de.fangfang.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fangfang.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    ObjectMapper objectMapper;

    @Autowired
    UserRepo userRepo;

    @Test
    @WithMockUser
    void hello_me_test() throws Exception {
        mvc.perform(get(userEndPoint + "/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("user"));
    }

    @Test
    void hello_me_test_401() throws Exception {
        mvc.perform(get(userEndPoint + "/me"))
                .andExpect(status().is(401));
    }

    @Test
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
                                """)
                )
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void login_expect_200() throws Exception {
        mvc.perform(post(userEndPoint + "/login").with(csrf()))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void logout_expect_200() throws Exception {
        mvc.perform(post(userEndPoint + "/logout").with(csrf()))
                .andExpect(status().isOk());
    }
}
