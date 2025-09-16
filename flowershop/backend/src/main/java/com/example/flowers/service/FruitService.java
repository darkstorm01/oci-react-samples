// package com.example.flowers.service;

// import com.example.flowers.model.Fruit;
// import com.example.flowers.repository.FruitRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class FruitService {
//     private final FruitRepository repo;

//     public FruitService(FruitRepository repo) {
//         this.repo = repo;
//     }

//     public List<Fruit> getAllFruits() { return repo.findAll(); }

//     public Optional<Fruit> getFruitById(Long id) { return repo.findById(id); }

//     public Fruit createFruit(Fruit fruit) { return repo.save(fruit); }

//     public Optional<Fruit> updateFruit(Long id, Fruit fruitDetails) {
//         return repo.findById(id).map(existing -> {
//             existing.setName(fruitDetails.getName());
//             existing.setColor(fruitDetails.getColor());
//             existing.setDescription(fruitDetails.getDescription());
//             existing.setPrice(fruitDetails.getPrice());
//             return repo.save(existing);
//         });
//     }

//     public boolean deleteFruit(Long id) {
//         if (repo.existsById(id)) {
//             repo.deleteById(id);
//             return true;
//         }
//         return false;
//     }
// }