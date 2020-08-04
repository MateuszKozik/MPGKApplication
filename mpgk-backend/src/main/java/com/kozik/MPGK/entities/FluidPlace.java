package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "fluid_places")
public class FluidPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "place_id", nullable = false)
    private Long placeId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "fluidPlace")
    private List<FluidRegistry> fluidRegistries;
}