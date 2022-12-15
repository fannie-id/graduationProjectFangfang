package de.fangfang.backend.service;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.repository.DeedRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeedService {
    private final DeedRepo deedRepo;


    public DeedService(DeedRepo deedRepo) {
        this.deedRepo = deedRepo;
    }

    public List<Deed> listAllDeeds(){
        return deedRepo.findAll();
    }
}
