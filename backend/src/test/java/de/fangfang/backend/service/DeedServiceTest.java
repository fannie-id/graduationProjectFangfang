package de.fangfang.backend.service;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.repository.DeedRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class DeedServiceTest {
    DeedRepo deedRepo = mock(DeedRepo.class);

    DeedService deedService = new DeedService(deedRepo);
    @Test
    void listAllDeeds_except_emptyList() {
        List<Deed> expected = new ArrayList<>();
        List<Deed> result = deedService.listAllDeeds();
        assertEquals(expected,result);
    }
}