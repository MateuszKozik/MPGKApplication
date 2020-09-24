package com.kozik.MPGK.controllers;

import javax.validation.Valid;
import org.springframework.validation.BindingResult;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import com.kozik.MPGK.utilities.Message;

@RestController
@CrossOrigin
@Api(tags = "persons", description = "Operations about person")
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all persons
    @ApiOperation(value = "Get all persons")
    @GetMapping("")
    public Iterable<Person> getPersons() {
        return personService.listAll();
    }

    // Get single person
    @ApiOperation(value = "Get person by id")
    @GetMapping("/{personId}")
    public ResponseEntity<?> getPerson(
            @ApiParam(value = "Unique id of person", example = "123") @PathVariable Long personId) {
        return new ResponseEntity<>(personService.get(personId), HttpStatus.OK);
    }

    // Create person
    @ApiOperation(value = "Create new person")
    @PostMapping("")
    public ResponseEntity<?> createPerson(@ApiParam(value = "Created person object") @Valid @RequestBody Person person,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(personService.save(person), HttpStatus.CREATED);
    }

    // Update person
    @ApiOperation(value = "Update person")
    @PutMapping("/{personId}")
    public ResponseEntity<?> updatePerson(
            @ApiParam(value = "Id that need to be updated", example = "123") @PathVariable Long personId,
            @ApiParam(value = "Updated person object") @Valid @RequestBody Person person, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(personService.update(personId, person), HttpStatus.OK);
    }

    // Delete person
    @ApiOperation(value = "Delete person")
    @DeleteMapping("/{personId}")
    public ResponseEntity<?> deletePerson(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long personId) {
        personService.delete(personId);
        return new ResponseEntity<>(new Message("Person with id: " + personId + " has been removed."), HttpStatus.OK);
    }
}