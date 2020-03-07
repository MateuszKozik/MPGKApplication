package com.kozik.MPGK.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {
    
    @Id
    @Column(name = "username", nullable = false, length = 35)
    private String username;

    @Column(name = "password", nullable = false, length = 60)
    private String password;

    @Column(name = "enabled", nullable = false)
    private Boolean enabled = true;

    @ManyToMany
    @JoinTable(name = "users_roles", joinColumns = {
        @JoinColumn(name = "user_username", referencedColumnName = "username")},
        inverseJoinColumns = {
            @JoinColumn(name ="role_name", referencedColumnName = "name")})
    private List<Role> role;

    @OneToOne(mappedBy = "user")
    private Person person;
}