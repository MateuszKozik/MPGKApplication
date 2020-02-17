package com.kozik.MPGK.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "connections")
@Data
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "connection_id", nullable = false)
    private Long connectionId;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private InspectionType inspectionType;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private ActivityGroup activityGroup;

    @ManyToMany
    @JoinTable(name = "connections_persons", joinColumns = {
        @JoinColumn(name = "connection_id", referencedColumnName = "connection_id")},
        inverseJoinColumns = {
            @JoinColumn(name = "person_id", referencedColumnName = "person_id")})
    private Set<Person> person;

    public Connection() {}
}