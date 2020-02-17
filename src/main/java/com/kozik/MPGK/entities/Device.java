package com.kozik.MPGK.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "devices")
@Data
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "status", nullable = false)
    private String status;

    @OneToMany(mappedBy = "devices")
    private Set<FluidRegistry> fluidsRegistry;

    @OneToMany(mappedBy = "devices")
    private Set<Connection> connections;
}