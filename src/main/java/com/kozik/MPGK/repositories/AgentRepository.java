package com.kozik.MPGK.repositories;

import com.kozik.MPGK.entities.Agent;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepository extends JpaRepository<Agent, Long> {

    
}