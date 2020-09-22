package com.kozik.MPGK.services;

import com.kozik.MPGK.repositories.UserRepository;

import java.util.List;

import javax.transaction.Transactional;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.entities.Person;
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

    @Autowired
    private ConnectionService connectionService;

    @Transactional
    public User saveUser(User user) {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setConfirmPassword("");
            Person person = user.getPerson();
            person.setUser(user);
            User newUser = userRepository.save(user);
            for (Connection connection : person.getConnections()) {
                List<Person> persons = connection.getPersons();
                persons.add(newUser.getPerson());
                connection.setPersons(persons);
                connectionService.update(connection.getConnectionId(), connection);
            }

            return user;
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException(user.getUsername());
        }
    }
}