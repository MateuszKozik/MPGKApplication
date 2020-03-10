package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.PersonService;
import com.kozik.MPGK.utilities.ErrorMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired private PersonService personService;

    //Get all persons
    @GetMapping("/persons")
    public ResponseEntity<List<Person>> getPersons(){
        List<Person> persons = personService.listAll();
        if(persons.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Person>>(persons, HttpStatus.OK);
    }

    //Get single person
    @GetMapping("/persons/{personId}")
    public ResponseEntity<?> getPerson(@PathVariable("personId")Long personId){
        if(!personService.isPersonExist(personId)){
            return new ResponseEntity<>(new ErrorMessage("Person with id " + personId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Person person = personService.get(personId);
        return new ResponseEntity<Person>(person, HttpStatus.OK);
    }

    //Create person
    @PostMapping("/persons")
    public ResponseEntity<?> createFluid(@RequestBody Person person, UriComponentsBuilder builder){
        Long personId = person.getPersonId();
        if(personId != null){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. Person with id " + personId 
            + " already exist."), HttpStatus.CONFLICT);
        }
        personService.save(person);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/persons/{personId}").buildAndExpand(person.getPersonId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update person
    @PutMapping("/persons/{personId}")
    public ResponseEntity<?> updatePerson(@PathVariable("personId")Long personId, @RequestBody Person person){
        if(!personService.isPersonExist(personId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. Person with id " + personId + " not found."),
            HttpStatus.NOT_FOUND);
        }
        Person currentPerson = personService.update(personId,person);
        return new ResponseEntity<Person>(currentPerson, HttpStatus.OK);
    }

    //Delete person
    @DeleteMapping("/persons/{personId}")
    public ResponseEntity<?> deletePerson(@PathVariable("personId")Long personId){
        if(!personService.isPersonExist(personId)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Perosn with id " + personId + " not found"),
            HttpStatus.NOT_FOUND);
        }
        personService.delete(personId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}