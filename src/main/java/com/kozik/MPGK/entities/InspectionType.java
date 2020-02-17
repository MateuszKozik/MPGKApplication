package com.kozik.MPGK.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "inspections_type")
@Data
public class InspectionType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "type_id", nullable = false)
    private Long typeId;

    @Column(name = "name", nullable = false)
    private String name;
}