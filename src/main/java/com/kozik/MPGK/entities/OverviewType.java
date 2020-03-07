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

@Entity
@Table(name = "overview_types")
@Data
public class OverviewType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "type_id", nullable = false)
    private Long typeId;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @OneToMany(mappedBy = "overviewType")
    private List<Connection> connections;

    public OverviewType() {}
}