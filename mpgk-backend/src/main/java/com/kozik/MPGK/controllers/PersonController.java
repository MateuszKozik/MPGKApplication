package com.kozik.MPGK.controllers;



import javax.validation.Valid;
import org.springframework.validation.BindingResult;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.services.PersonService;
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
import com.kozik.MPGK.utilities.Message;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired 
    private PersonService personService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    //Get all persons
    @GetMapping("")
    public Iterable<Person> getPersons() {
        return personService.listAll();
    }

    //Get single person
    @GetMapping("/{personId}")
    public ResponseEntity<?> getPerson(@PathVariable Long personId) {
        return new ResponseEntity<Person>(personService.get(personId), HttpStatus.OK);
    }

    //Create person
    @PostMapping("")
    public ResponseEntity<?> createPerson(@Valid @RequestBody Person person, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Person>(personService.save(person), HttpStatus.CREATED);
    }

    //Update person
    @PutMapping("/{personId}")
    public ResponseEntity<?> updatePerson(@PathVariable Long personId, @Valid @RequestBody Person person,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Person>(personService.update(personId, person), HttpStatus.OK);
    }

    //Delete person
    @DeleteMapping("{personId}")
    public ResponseEntity<?> deletePerson(@PathVariable("personId") Long personId) {
        personService.delete(personId);
        return new ResponseEntity<Message>(new Message("Person with id: " + personId + " has been removed."),
                HttpStatus.OK);
    }
}