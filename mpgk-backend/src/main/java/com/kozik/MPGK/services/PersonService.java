package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.repositories.PersonRepository;
import com.kozik.MPGK.exceptions.personExceptions.PersonAlreadyExistException;
import com.kozik.MPGK.exceptions.personExceptions.PersonNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

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
        Person person = personRepository.findById(personId).orElseThrow(() -> new PersonNotFoundException(personId));
        return person;
    }

    public void delete(Long personId) {
        personRepository.delete(get(personId));
    }

    public Boolean isPersonExist(Long id) {
        return personRepository.existsById(id);
    }

    public Person update(Long personId, Person person) {
        Person newPerson = personRepository.findById(personId).map(element -> {
            element.setName(person.getName());
            element.setSurname(person.getSurname());
            return personRepository.save(element);
        }).orElseThrow(() -> new PersonNotFoundException(personId));

        return newPerson;
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