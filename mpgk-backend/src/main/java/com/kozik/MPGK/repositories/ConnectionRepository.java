package com.kozik.MPGK.repositories;

import com.kozik.MPGK.entities.Connection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectionRepository extends JpaRepository<Connection, Long>{
    
}