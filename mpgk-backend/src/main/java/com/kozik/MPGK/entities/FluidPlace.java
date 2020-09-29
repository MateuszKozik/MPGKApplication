package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fluid_places")
public class FluidPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id", nullable = false)
    private Long placeId;

    @NotBlank(message = "Nazwa miejsca dodania czynnika jest wymagana")
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "fluidPlace")
    @JsonIgnore
    private List<FluidRegistry> fluidRegistries;

    public FluidPlace(String name, List<FluidRegistry> fluidRegistries) {
        this.name = name;
        this.fluidRegistries = fluidRegistries;
    }
}