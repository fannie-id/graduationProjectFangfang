package de.fangfang.backend.service;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.repository.DeedRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeedService {
    private final DeedRepo deedRepo;
    private final IdGeneratorService idGeneratorService;

    private static final IllegalArgumentException ID_NOT_FOUND = new IllegalArgumentException("Id not found");


    public DeedService(DeedRepo deedRepo, IdGeneratorService idGeneratorService) {
        this.deedRepo = deedRepo;
        this.idGeneratorService = idGeneratorService;
    }

    public List<Deed> listAllDeeds() {
        return deedRepo.findAll();
    }


    public Deed getDeedById(String id) {
        Optional<Deed> optionalDeed = deedRepo.findById(id);
        if (optionalDeed.isPresent()) {
            return optionalDeed.get();
        }
        throw ID_NOT_FOUND;

    }

    public Deed addDeed(DeedDTO newDeed) {
        String id = idGeneratorService.generateUuid();
        Deed deedToSave = newDeed.withId(id);

        return deedRepo.save(deedToSave);
    }


    public Deed editDeed(String id, DeedDTO deed) {
        Optional<Deed> optionalDeed = deedRepo.findById(id);
        if (optionalDeed.isPresent()) {
            Deed deedToChange = new Deed(id, deed.description(), deed.address(), deed.karmaPoints());
            return deedRepo.save(deedToChange);
        }
        throw ID_NOT_FOUND;
    }

    public void deleteDeedById(String id) {
        Optional<Deed> optionalDeed = deedRepo.findById(id);
        if (optionalDeed.isPresent()) {
            deedRepo.deleteById(id);
        } else {
            throw ID_NOT_FOUND;
        }
    }
}
