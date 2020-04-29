package com.kozik.MPGK.repositories;

import com.kozik.MPGK.entities.Activity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    
}