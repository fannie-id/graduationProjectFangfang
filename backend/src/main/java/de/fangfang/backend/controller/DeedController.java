package de.fangfang.backend.controller;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.service.DeedService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/deeds")
public class DeedController {
    private final DeedService deedService;

    public DeedController(DeedService deedService) {
        this.deedService = deedService;
    }

    @GetMapping
    public List<Deed> getAllDeeds(){
        return deedService.listAllDeeds();
    }

    @PostMapping
    public Deed addDeed(Deed newDeed){

        return deedService.addDeed(newDeed);
    }
}
