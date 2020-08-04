package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.repositories.PersonRepository;
import com.kozik.MPGK.exceptions.personExceptions.PersonAlreadyExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired private PersonRepository personRepository;

    public Iterable<Person> listAll(){
        return personRepository.findAll();
    }

    public Person save(Person persId) {
        if (persId.getPersonId() != null) {
            throw new PersonAlreadyExistException(persId.getPersonId());
        }
        return personRepository.save(persId);
    }

    public Person get(Long id){
        return personRepository.findById(id).get();
    }

    public void delete(Long id){
        personRepository.deleteById(id);
    }

    public Boolean isPersonExist(Long id){
        return personRepository.existsById(id);
    }

    public Person update(Long id, Person person){
        Person currentPerson = get(id);
        currentPerson.setName(person.getName());
        currentPerson.setSurname(person.getSurname());
        save(currentPerson);

        return currentPerson;
    }
}