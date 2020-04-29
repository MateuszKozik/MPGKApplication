package com.kozik.MPGK.repositories;

import com.kozik.MPGK.entities.Person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

    
}