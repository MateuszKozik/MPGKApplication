package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "roles")
public class Role {

    @Id
    @Column(name = "name", nullable = false, length = 25)
    @NotBlank(message = "Nazwa uprawnienia jest wymagana")
    private String name;

    @ManyToMany(mappedBy = "role")
    private List<User> users;
}