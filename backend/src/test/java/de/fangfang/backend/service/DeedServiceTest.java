package de.fangfang.backend.service;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.repository.DeedRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;


import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DeedServiceTest {
    DeedRepo deedRepo = mock(DeedRepo.class);
    UuidGeneratorService uuidGeneratorService = mock(UuidGeneratorService.class);
    DeedService deedService = new DeedService(deedRepo, uuidGeneratorService);

    @Test
    void listAllDeeds_except_emptyList() {
        List<Deed> expected = new ArrayList<>();
        List<Deed> result = deedService.listAllDeeds();
        assertEquals(expected,result);
    }

    @Test
    void addDeed_except_validDeed(){
        DeedDTO deedDTO = new DeedDTO("description",null,4);
        String id = uuidGeneratorService.generateUuid();
        Deed expected = deedDTO.withId(id);
        when(deedRepo.save(expected)).thenReturn(expected);


        Deed result = deedService.addDeed(deedDTO);

        assertThat(result,is(expected));
        verify(deedRepo).save(expected);
    }
}