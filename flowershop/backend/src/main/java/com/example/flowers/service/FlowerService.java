package com.example.flowers.service;

import com.example.flowers.model.Flower;
import com.example.flowers.repository.FlowerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlowerService {
    private final FlowerRepository repo;

    public FlowerService(FlowerRepository repo) {
        this.repo = repo;
    }

    public List<Flower> getAllFlowers() {
        return repo.findAll();
    }
    public Optional<Flower> getFlowerById(Long id) {
        return repo.findById(id);
    }
    public Flower createFlower(Flower flower) {
        return repo.save(flower);
    }
    public Optional<Flower> updateFlower(Long id, Flower flowerDetails) {
        return repo.findById(id).map(existing -> {
            existing.setName(flowerDetails.getName());
            existing.setColor(flowerDetails.getColor());
            existing.setDescription(flowerDetails.getDescription());
            // existing.setPrice(flowerDetails.getPrice());
            return repo.save(existing);
        });
    }
    public boolean deleteFlower(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}