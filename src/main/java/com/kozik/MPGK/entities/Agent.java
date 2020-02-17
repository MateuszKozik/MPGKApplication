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
@Table(name = "agents")
@Data
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "agent_id", nullable = false)
    private Long agentId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "agent")
    private Set<FluidRegistry> fluidsRegistry;
}