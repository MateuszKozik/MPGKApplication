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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
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
    private Set<Role> role;

    @OneToOne(mappedBy = "user")
    private Person person;

    public User(){}

    public User(final String username,final String password,final Boolean enabled)
    {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }




}