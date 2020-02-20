package com.kozik.MPGK.entities;

import java.util.ArrayList;
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

@Entity
@Table(name = "persons")
@Data
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

    @ManyToMany(mappedBy = "person")
    private List<Connection> connections;

    @OneToMany(mappedBy = "person") 
    private List<Overview> overview;

    @OneToMany(mappedBy = "person") 
    private List<FluidRegistry> fluidsRegistry;

    public Person(){}

    public Person(String name,String surname)
    {
        this.name = name;
        this.surname = surname;
    }




}