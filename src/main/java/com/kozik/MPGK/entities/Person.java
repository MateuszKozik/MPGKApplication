package com.kozik.MPGK.entities;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "persons")
public class Person{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "person_id", nullable = false)
    private Long personId;

    @Column(name = "name", nullable = false, length = 35)
    private String name;

    @Column(name = "surname", nullable = false, length = 35)
    private String surname;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToMany(mappedBy = "persons")
    private List<Connection> connections;

    @OneToMany(mappedBy = "person") 
    private List<Overview> overviews;

    @OneToMany(mappedBy = "supervisor") 
    private List<Overview> overviewSupervisors;

    @OneToMany(mappedBy = "person") 
    private List<FluidRegistry> fluidsRegistry;
}