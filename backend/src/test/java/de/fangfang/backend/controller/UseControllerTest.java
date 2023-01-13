package de.fangfang.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext
class UseControllerTest {
    private final String DeepEndPoint = "/api/users";

    @Autowired
    private MockMvc mvc;

    @Test
    @WithMockUser
    void hello_me_test() throws Exception {
        mvc.perform(get(DeepEndPoint + "/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello user"));
    }

    @Test
    void hello_me_test_400() throws Exception {
        mvc.perform(get(DeepEndPoint + "/me"))
                .andExpect(status().is(400));
    }
}
