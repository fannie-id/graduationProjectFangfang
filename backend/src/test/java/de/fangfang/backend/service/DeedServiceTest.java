package de.fangfang.backend.service;

import de.fangfang.backend.model.Address;
import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.model.DeedStatus;
import de.fangfang.backend.repository.DeedRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
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
    void getDeedById_throw_exception() {
        when(deedRepo.findById("9")).thenReturn(Optional.empty());

        try {
            deedService.getDeedById("2");
            fail();
        } catch (IllegalArgumentException e) {
            //THEN
            assertEquals("Id not found", e.getMessage());
        }

    }

    @Test
    void getDeedById_expect_validDeed() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        when(idGeneratorService.generateUuid()).thenReturn("123");
        Deed expected = new Deed(idGeneratorService.generateUuid(), "description", address, 4, DeedStatus.CREATED);
        when(deedRepo.findById("123")).thenReturn(Optional.of(expected));


        Deed result = deedService.getDeedById("123");

        assertThat(result, is(expected));
    }

    @Test
    void addDeed_expect_validDeed() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        DeedDTO deedDTO = new DeedDTO("description", address, 4, DeedStatus.CREATED);
        when(idGeneratorService.generateUuid()).thenReturn("123");
        Deed expected = new Deed(idGeneratorService.generateUuid(), "description", address, 4, DeedStatus.CREATED);
        when(deedRepo.save(expected)).thenReturn(expected);


        Deed result = deedService.addDeed(deedDTO);

        assertThat(result, is(expected));
        verify(deedRepo).save(expected);
    }

    @Test
    void editDeed_expect_validDeed() {
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        DeedDTO deedDTO = new DeedDTO("new description", address, 4, DeedStatus.ASSIGNED);
        Deed old = new Deed("1", "old description", address, 2, DeedStatus.CREATED);
        Deed expected = new Deed("1", "new description", address, 4, DeedStatus.ASSIGNED);
        when(deedRepo.findById("1")).thenReturn(Optional.of(old));
        when(deedRepo.save(expected)).thenReturn(expected);

        Deed result = deedService.editDeed("1", deedDTO);

        assertThat(result, is(expected));

    }

    @Test
    void editDeed_throw_exception() {
        when(deedRepo.findById("9")).thenReturn(Optional.empty());
        Address address = new Address("wallstreet", "2", "48939", "New York City", "Fangfang");
        DeedDTO deedDTO = new DeedDTO("new description", address, 4, DeedStatus.CREATED);

        try {
            deedService.editDeed("2", deedDTO);
            fail();
        } catch (IllegalArgumentException e) {
            //THEN
            assertEquals("Id not found", e.getMessage());
        }
    }
}
