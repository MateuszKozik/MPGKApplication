package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "connections")
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "connection_id", nullable = false)
    private Long connectionId;

    @NotBlank(message = "Nazwa powiązania jest wymagana")
    @Column(name = "name", nullable = false, length = 70)
    private String name;

    @NotNull(message = "Status połączenia jest wymagany")
    @Column(name = "status", nullable = false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = true)
    private Device device;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = true)
    private InspectionType inspectionType;

    @OneToMany(mappedBy = "connection", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "connection", allowSetters = true)
    private List<ActivityGroup> activitiesGroups;

    @ManyToMany
    @JoinTable(name = "connections_persons", joinColumns = {
            @JoinColumn(name = "connection_id", referencedColumnName = "connection_id") }, inverseJoinColumns = {
                    @JoinColumn(name = "person_id", referencedColumnName = "person_id") })
    private List<Person> persons;
}