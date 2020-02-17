package com.kozik.MPGK.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import lombok.Data;

import javax.persistence.Id;

@Entity
@Table(name = "agents")
@Data
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "agentID", nullable = false)
    private Long agentID;

    @Column(name = "name", nullable = false)
    private String name;
}