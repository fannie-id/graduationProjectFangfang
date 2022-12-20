package de.fangfang.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fangfang.backend.model.Deed;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;


import static org.junit.jupiter.api.Assertions.assertEquals;
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

    @Test
    void getAllDeeds_expect_empty_list() throws Exception{
        mvc.perform(get(DeepEndPoint))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }
    @Test
    @DirtiesContext
    void addDeed_expect_correct_Deed() throws Exception {
        MvcResult response = mvc.perform(post(DeepEndPoint)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "description":"max",
                        "address":{},
                        "karmaPoints":2
                        }
                        """)
        )
                .andExpect(status().isOk())
                .andReturn();
        String content = response.getResponse().getContentAsString();
        Deed result = objectMapper.readValue(content,Deed.class);
        Deed expected = new Deed(result.id(), result.description(),result.address(),result.karmaPoints());
        assertEquals(result,expected);

    }

}