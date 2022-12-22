package de.fangfang.backend.service;

import de.fangfang.backend.model.Address;
import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.repository.DeedRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class DeedServiceTest {
    DeedRepo deedRepo = mock(DeedRepo.class);
    IdGeneratorService idGeneratorService = mock(IdGeneratorService.class);
    DeedService deedService = new DeedService(deedRepo, idGeneratorService);

    @Test
    void listAllDeeds_expect_emptyList() {
        List<Deed> expected = new ArrayList<>();
        List<Deed> result = deedService.listAllDeeds();
        assertEquals(expected, result);
    }

    @Test
    void getDeedById_expect_validDeed() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        when(idGeneratorService.generateUuid()).thenReturn("123");
        Deed expected = new Deed(idGeneratorService.generateUuid(), "description", address, 4);
        when(deedRepo.findById("123")).thenReturn(Optional.of(expected));


        Deed result = deedService.getDeedById("123");

        assertThat(result, is(expected));
    }

    @Test
    void addDeed_expect_validDeed() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        DeedDTO deedDTO = new DeedDTO("description", address, 4);
        when(idGeneratorService.generateUuid()).thenReturn("123");
        Deed expected = new Deed(idGeneratorService.generateUuid(), "description", address, 4);
        when(deedRepo.save(expected)).thenReturn(expected);


        Deed result = deedService.addDeed(deedDTO);

        assertThat(result, is(expected));
        verify(deedRepo).save(expected);
    }
}
