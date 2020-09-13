package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.CascadeType;
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
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = "user")
@Table(name = "persons")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id", nullable = false)
    private Long personId;

    @NotBlank(message = "Imię jest wymagane")
    @Column(name = "name", nullable = false, length = 35)
    private String name;

    @NotBlank(message = "Nazwisko jest wymagane")
    @Column(name = "surname", nullable = false, length = 35)
    private String surname;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToMany(mappedBy = "persons")
    @JsonProperty(access = Access.WRITE_ONLY)
    private List<Connection> connections;

    @OneToMany(mappedBy = "person")
    @JsonIgnore
    private List<Inspection> inspections;

    @OneToMany(mappedBy = "person")
    @JsonIgnore
    private List<FluidRegistry> fluidRegistries;
}