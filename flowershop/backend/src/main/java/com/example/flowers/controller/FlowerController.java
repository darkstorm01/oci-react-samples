package com.example.flowers.controller;

import com.example.flowers.model.Flower;
import com.example.flowers.service.FlowerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flowers")
public class FlowerController {
    private final FlowerService flowerService;

    public FlowerController(FlowerService flowerService) {
        this.flowerService = flowerService;
    }

    @GetMapping
    public List<Flower> getAllFlowers() {
        return flowerService.getAllFlowers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flower> getFlowerById(@PathVariable Long id) {
        return flowerService.getFlowerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Flower> createFlower(@RequestBody Flower flower) {
        return ResponseEntity.ok(flowerService.createFlower(flower));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flower> updateFlower(@PathVariable Long id, @RequestBody Flower flower) {
        return flowerService.updateFlower(id, flower)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFlower(@PathVariable Long id) {
        return flowerService.deleteFlower(id) ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}