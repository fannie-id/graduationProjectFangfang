package de.fangfang.backend.controller;

import de.fangfang.backend.model.Deed;
import de.fangfang.backend.model.DeedDTO;
import de.fangfang.backend.service.DeedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deeds")
public class DeedController {
    private final DeedService deedService;

    public DeedController(DeedService deedService) {
        this.deedService = deedService;
    }

    @GetMapping
    public ResponseEntity<List<Deed>> getAllDeeds() {
        return new ResponseEntity<>(deedService.listAllDeeds(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Deed> getDeedById(@PathVariable String id) {
        return new ResponseEntity<>(deedService.getDeedById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Deed> addDeed(@RequestBody DeedDTO newDeed) {
        return new ResponseEntity<>(deedService.addDeed(newDeed), HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Deed> editDeed(@PathVariable String id, @RequestBody DeedDTO deed) {
        return new ResponseEntity<>(deedService.editDeed(id, deed), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDeedById(@PathVariable String id) {
        deedService.deleteDeedById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
