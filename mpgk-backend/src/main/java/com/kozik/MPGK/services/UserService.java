package com.kozik.MPGK.services;

import com.kozik.MPGK.repositories.UserRepository;
import com.kozik.MPGK.entities.User;
import com.kozik.MPGK.exceptions.userExceptions.UsernameAlreadyExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException(newUser.getUsername());
        }
    }
}