package com.example.flowers.model;

import jakarta.persistence.*;

@Entity
@Table(name = "flowers")
public class Flower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    private String color;
    private String description;
    @Column(nullable = false)
    private Double price;

    public Flower() {}

    public Flower(String name, String color, String description) {
        this.name = name;
        this.color = color;
        this.description = description;
    }

    public Flower(String name, String color, String description, Double price) {
        this.name = name;
        this.color = color;
        this.description = description;
        this.price = price;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}