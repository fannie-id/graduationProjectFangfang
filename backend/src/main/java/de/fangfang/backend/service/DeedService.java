package de.fangfang.backend.service;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.repository.DeedRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeedService {
    private final DeedRepo deedRepo;
    private final IdGeneratorService idGeneratorService;


    public DeedService(DeedRepo deedRepo, IdGeneratorService idGeneratorService) {
        this.deedRepo = deedRepo;
        this.idGeneratorService = idGeneratorService;
    }

    public List<Deed> listAllDeeds(){
        return deedRepo.findAll();
    }

    public Deed addDeed(DeedDTO newDeed){
        String id = idGeneratorService.generateUuid();
        Deed deedToSave = newDeed.withId(id);

        return deedRepo.save(deedToSave);
    }
}
