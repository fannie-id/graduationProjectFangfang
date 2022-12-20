package de.fangfang.backend.service;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.repository.DeedRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeedService {
    private final DeedRepo deedRepo;
    private final UuidGeneratorService uuidGeneratorService;


    public DeedService(DeedRepo deedRepo, UuidGeneratorService uuidGeneratorService) {
        this.deedRepo = deedRepo;
        this.uuidGeneratorService = uuidGeneratorService;
    }

    public List<Deed> listAllDeeds(){
        return deedRepo.findAll();
    }

    public Deed addDeed(DeedDTO newDeed){

        String id = uuidGeneratorService.generateUuid();
        Deed deedToSave = newDeed.withId(id);

        return deedRepo.save(deedToSave);
    }
}
