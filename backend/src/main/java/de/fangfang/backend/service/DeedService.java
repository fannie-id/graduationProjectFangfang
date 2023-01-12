package de.fangfang.backend.service;

import de.fangfang.backend.exception.IdNotFoundException;
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

    public List<Deed> listAllDeeds() {
        return deedRepo.findAll();
    }


    public Deed getDeedById(String id) {
        return deedRepo.findById(id).orElseThrow(IdNotFoundException::new);
    }

    public Deed addDeed(DeedDTO newDeed) {
        String id = idGeneratorService.generateUuid();
        Deed deedToSave = newDeed.withId(id);

        return deedRepo.save(deedToSave);
    }


    public Deed editDeed(String id, DeedDTO deed) {
        if (deedRepo.findById(id).isEmpty()) {
            throw new IdNotFoundException();
        }
        Deed deedToChange = new Deed(id, deed.description(), deed.address(), deed.karmaPoints(), deed.deedStatus());
        return deedRepo.save(deedToChange);
    }

    public void deleteDeedById(String id) {
        if (deedRepo.findById(id).isEmpty()) {
            throw new IdNotFoundException();
        }
        deedRepo.deleteById(id);
    }
}
