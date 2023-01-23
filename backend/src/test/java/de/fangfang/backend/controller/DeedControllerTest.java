package de.fangfang.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedStatus;
import de.fangfang.backend.repository.DeedRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext
class DeedControllerTest {
    String DeepEndPoint = "/api/deeds";
    @Autowired
    private MockMvc mvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    DeedRepo deedRepo;

    @Test
    @WithMockUser
    void getAllDeeds_expect_empty_list() throws Exception {
        mvc.perform(get(DeepEndPoint))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void addDeed_expect_correct_Deed() throws Exception {
        MvcResult response = mvc.perform(post(DeepEndPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "description":"do something",
                                "address": "wallstreet",
                                "name": "Fangfang",
                                "lng": 0.0,
                                "lat": 0.0,
                                "karmaPoints":2
                                }
                                """).with(csrf())
                )
                .andExpect(status().is(200))
                .andReturn();
        String content = response.getResponse().getContentAsString();
        Deed result = objectMapper.readValue(content, Deed.class);

        assertFalse(result.id().isEmpty());

    }


    @Test
    @WithMockUser
    @DirtiesContext
    void editDeed_expect_correct_Deed() throws Exception {
        Deed deed = new Deed("10", "description", "wallstreet", "Fangfang", 0.0F, 0.0F, 4, DeedStatus.CREATED, "", "");
        deedRepo.save(deed);
        mvc.perform(put(DeepEndPoint + "/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "description":"do something",
                                "address": "wallstreet",
                                "name": "Fangfang",
                                "lng": 0.0,
                                "lat": 0.0,
                                "karmaPoints":2,
                                "author":"max",
                                "maker": "fangfang"
                                }
                                """).with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "10",
                        "description":"do something",
                        "address": "wallstreet",
                        "name": "Fangfang",
                        "lng": 0.0,
                        "lat": 0.0,
                        "karmaPoints":2,
                        "author":"max",
                        "maker": "fangfang"
                        }
                        """))
                .andReturn();


    }


    @Test
    @WithMockUser
    @DirtiesContext
    void findDeed_expect_correct_Deed() throws Exception {
        Deed deed = new Deed("10", "description", "wallstreet", "Fangfang", 0.0F, 0.0F, 4, DeedStatus.CREATED, "", "");

        deedRepo.save(deed);
        mvc.perform(get(DeepEndPoint + "/10"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "10",
                        "description":"description",
                        "address": "wallstreet",
                        "name": "Fangfang",
                        "lng": 0.0,
                        "lat": 0.0,
                        "karmaPoints":4,
                        "author":"",
                        "maker": ""
                        }
                        """));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void search_incorrect_Deed_throws_404() throws Exception {
        mvc.perform(get(DeepEndPoint + "/10").with(csrf()))
                .andExpect(status().is(404));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void editDeed_throws_404() throws Exception {
        mvc.perform(put(DeepEndPoint + "/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "description":"max",
                                "address": "wallstreet",
                                "name": "Fangfang",
                                "lng": 0.0,
                                "lat": 0.0,
                                "karmaPoints":2,
                                "author":"",
                                "maker": ""
                                }
                                """).with(csrf())
                )
                .andExpect(status().is(404));
    }


    @Test
    @WithMockUser
    @DirtiesContext
    void editDeed_throws_400() throws Exception {
        mvc.perform(put(DeepEndPoint + "/10").with(csrf()))
                .andExpect(status().is(400));
    }


    @Test
    @WithMockUser
    @DirtiesContext
    void deleteDeed_expect_correct_status() throws Exception {
        Deed deed = new Deed("10", "description", "wallstreet", "Fangfang", 0.0F, 0.0F, 4, DeedStatus.CREATED, "", "");

        deedRepo.save(deed);
        mvc.perform(delete(DeepEndPoint + "/10").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void delete_incorrect_Deed_throws_404() throws Exception {
        mvc.perform(delete(DeepEndPoint + "/10").with(csrf()))
                .andExpect(status().is(404));
    }
}