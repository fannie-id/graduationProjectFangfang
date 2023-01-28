package de.fangfang.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fangfang.backend.model.User;
import de.fangfang.backend.model.UserInfo;
import de.fangfang.backend.repository.UserRepo;
import de.fangfang.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    @MockBean
    private UserService userService;
    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @WithMockUser(username = "max")
    @DirtiesContext
    void hello_me_test() throws Exception {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                "wallstreet 3",
                "Fangfang",
                0.0F,
                0.0F,
                0,
                ""
        ));
        mvc.perform(get(userEndPoint + "/me"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void hello_me_test_withoutLogin() throws Exception {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        UserInfo expected = new UserInfo(
                "anonymousUser",
                "",
                givenDeeds,
                takenDeeds,
                "",
                "",
                0.0F,
                0.0F,
                0,
                ""
        );

        MvcResult mvcResult = mvc.perform(get(userEndPoint + "/me"))
                .andExpect(status().is(200))
                .andReturn();
        UserInfo result = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), UserInfo.class);
        assertEquals(result, expected);
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
                                "address": "wallstreet",
                                "name": "Fangfang",
                                "lng": 0.0,
                                "lat": 0.0,
                                "karmaPoints":0,
                                "img": ""
                                }
                                """).with(csrf())
                )
                .andExpect(status().isOk());
    }

    @WithMockUser(username = "max")
    @DirtiesContext
    @Test
    void login_expect_200() throws Exception {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                "wallstreet 3",
                "Fangfang",
                0.0F,
                0.0F,
                0,
                ""
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
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                "wallstreet 3",
                "max",
                0.0F,
                0.0F,
                0,
                ""
        ));

        MvcResult mvcResult = mvc.perform(put(userEndPoint + "/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username":"max",
                                "email": "max@max.de",
                                "givenDeeds": [],
                                "takenDeeds": [],
                                "address": "wallstreet 3",
                                "name": "max",
                                "lng": 0.0,
                                "lat": 0.0,
                                "karmaPoints":0,
                                "img": ""
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
                "wallstreet 3",
                "max",
                0.0F,
                0.0F,
                0,
                ""
        );
        UserInfo result = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), UserInfo.class);
        assertEquals(expected, result);
    }

    @WithMockUser
    @DirtiesContext
    @Test
    void delete_user_get_200() throws Exception {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                "wallstreet 3",
                "Fangfang",
                0.0F,
                0.0F,
                0,
                ""
        ));

        mvc.perform(delete(userEndPoint + "/max").with(csrf()))
                .andExpect(status().isOk());
    }


    @WithMockUser
    @DirtiesContext
    @Test
    void gain_points_get_200() throws Exception {
        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();
        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                "wallstreet 3",
                "Fangfang",
                0.0F,
                0.0F,
                0,
                ""
        ));
        mvc.perform(put(userEndPoint + "/validate/max")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("5").with(csrf())
                )
                .andExpect(status().isOk());
    }

    @WithMockUser("max")
    @DirtiesContext
    @Test
    void upload_img_get_200() throws Exception {

        List<String> givenDeeds = new ArrayList<>();
        List<String> takenDeeds = new ArrayList<>();

        String fileName = "file.jpg";
        byte[] fileBytes = "file content".getBytes();
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file", fileName, "application/json", fileBytes);


        userRepo.save(new User(
                "1",
                "max",
                "password",
                "email",
                givenDeeds,
                takenDeeds,
                "wallstreet 3",
                "max",
                0.0F,
                0.0F,
                0,
                ""
        ));
        String expected = "foto";
        Mockito.when(userService.uploadImg("max", mockMultipartFile)).thenReturn(expected);

        mvc.perform(MockMvcRequestBuilders.multipart(userEndPoint + "/max")
                        .file(mockMultipartFile))
                .andExpect(status().isOk())
                .andReturn();

    }
}
