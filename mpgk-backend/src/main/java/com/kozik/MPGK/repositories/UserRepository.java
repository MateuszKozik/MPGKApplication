package com.kozik.MPGK.repositories;

import com.kozik.MPGK.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    User getByUserId(Long userId);
}