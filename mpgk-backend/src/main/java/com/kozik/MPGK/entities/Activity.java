package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id", nullable = false)
    private Long activityId;

    @NotBlank(message = "Nazwa czynnosci jest wymagana")
    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(name = "type", nullable = false, length = 25)
    private String type;

    @Column(name = "emsr", nullable = true, length = 25)
    private String emsr;

    @Column(name = "setting", nullable = true, length = 35)
    private String setting;

    @OneToMany(mappedBy = "activity")
    private List<Overview> overviews;

    @ManyToOne
    @JoinColumn(name = "groupId", nullable = true)
    private ActivityGroup activityGroup;
}