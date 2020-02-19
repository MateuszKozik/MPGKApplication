package com.kozik.MPGK.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@Table(name = "fluids")
@Data
public class Fluid {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fluid_id", nullable = false)
    private Long agentId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "fluid")
    private Set<FluidRegistry> fluidsRegistry;


    public Fluid() {}
}
