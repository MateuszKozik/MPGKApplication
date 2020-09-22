package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.entities.User;
import com.kozik.MPGK.repositories.PersonRepository;
import com.kozik.MPGK.repositories.UserRepository;
import com.kozik.MPGK.exceptions.personExceptions.PersonAlreadyExistException;
import com.kozik.MPGK.exceptions.personExceptions.PersonNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Iterable<Person> listAll() {
        return personRepository.findAll();
    }

    public Person save(Person persId) {
        if (persId.getPersonId() != null) {
            throw new PersonAlreadyExistException(persId.getPersonId());
        }
        return personRepository.save(persId);
    }

    public Person get(Long personId) {
        return personRepository.findById(personId).orElseThrow(() -> new PersonNotFoundException(personId));
    }

    public void delete(Long personId) {
        personRepository.delete(get(personId));
    }

    public Boolean isPersonExist(Long id) {
        return personRepository.existsById(id);
    }

    public Person update(Long personId, Person person) {

        User user = userRepository.findById(person.getUser().getUserId()).map(item -> {
            item.setEnabled(person.getUser().getEnabled());
            item.setRole(person.getUser().getRole());
            if (!item.getPassword().equals(person.getUser().getPassword())) {
                item.setPassword(bCryptPasswordEncoder.encode(person.getUser().getPassword()));
            }
            return userRepository.save(item);
        }).orElseThrow(() -> new PersonNotFoundException(personId));

        return personRepository.findById(personId).map(element -> {
            element.setName(person.getName());
            element.setSurname(person.getSurname());
            element.setUser(user);
            return personRepository.save(element);
        }).orElseThrow(() -> new PersonNotFoundException(personId));
    }

    // Get person by username
    public Person getByUsername(String username) {
        Person person = personRepository.findByUserUsername(username);
        if (person == null) {
            throw new PersonNotFoundException(0L);
        }
        return person;
    }
}