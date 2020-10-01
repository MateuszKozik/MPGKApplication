package com.kozik.MPGK.servicesTests;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.google.common.collect.Iterables;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.entities.User;
import com.kozik.MPGK.exceptions.personExceptions.PersonAlreadyExistException;
import com.kozik.MPGK.exceptions.personExceptions.PersonNotFoundException;
import com.kozik.MPGK.repositories.PersonRepository;
import com.kozik.MPGK.repositories.UserRepository;
import com.kozik.MPGK.services.PersonService;
import com.kozik.MPGK.services.UserService;

import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class PersonServiceTest {

    @Mock
    PersonRepository personRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    PersonService personService;

    @InjectMocks
    UserService userService;

    @Test
    public void shouldListAllTest() {

        // Given
        List<Person> persons = Stream.of(new Person(1L, "name", "surname", null, null, null, null),
                new Person(2L, "name2", "surname2", null, null, null, null)).collect(Collectors.toList());
        given(personRepository.findAll()).willReturn(persons);

        // When
        Integer size = Iterables.size(personService.listAll());

        // Then
        assertEquals(2, size);
    }

    @Test
    public void shouldSaveTest() {

        // Given
        Person person = new Person("name", "surname", null, null, null, null);
        given(personRepository.save(person)).willReturn(person);

        // When
        Person newPerson = personService.save(person);

        // Then
        assertEquals(person, newPerson);
    }

    @Test(expected = PersonAlreadyExistException.class)
    public void shouldNotSaveTest() {

        // Given
        Person person = new Person(1L, "name", "surname", null, null, null, null);

        // When
        try {
            personService.save(person);
            Assert.fail("Expected an PersonAlreadyExistException to be thrown");
        } catch (PersonAlreadyExistException e) {
        }

        // Then
        personService.save(person);
    }

    @Test
    public void shouldGetTest() {

        // Given
        Long personId = 1L;
        Optional<Person> person = Optional.of(new Person(personId, "name", "surname", null, null, null, null));
        given(personRepository.findById(personId)).willReturn(person);

        // When
        Person getPerson = personService.get(personId);

        // Then
        verify(personRepository).findById(personId);
        assertEquals(person.get(), getPerson);
    }

    @Test(expected = PersonNotFoundException.class)
    public void shouldNotGetTest() {

        // When
        try {
            personService.get(1L);
            Assert.fail("Expected an PersonNotFoundException to be thrown");
        } catch (PersonNotFoundException e) {
        }

        // Then
        personService.get(1L);
    }

    @Test
    public void shouldDeleteTest() {

        // Given
        Long personId = 1L;
        Person person = new Person(personId, "name", "surname", null, null, null, null);
        given(personRepository.findById(personId)).willReturn(Optional.of(person));

        // When
        personService.delete(personId);

        // Then
        verify(personRepository).findById(personId);
        verify(personRepository).delete(person);
    }

    @Test(expected = PersonNotFoundException.class)
    public void shouldNotDeleteTest() {

        // Given
        Long personId = 1L;

        // When
        try {
            personService.delete(1L);
            Assert.fail("Expected an PersonNotFoundException to be thrown");
        } catch (PersonNotFoundException e) {
        }

        // Then
        personService.delete(personId);
    }

    @Test
    public void shouldIsPersonExistTest() {

        // Given
        Long personId = 1L;
        given(personRepository.existsById(personId)).willReturn(Boolean.TRUE);

        // When
        Boolean isExist = personService.isPersonExist(personId);

        // Then
        assertTrue(isExist);
    }

    @Test
    public void shouldNotIsPersonExistTest() {

        // Given
        Long personId = 1L;
        given(personRepository.existsById(personId)).willReturn(Boolean.FALSE);

        // When
        Boolean isExist = personService.isPersonExist(personId);

        // Then
        assertFalse(isExist);
    }

    @Test
    public void shouldgetByUsername(){

         // Given
        String username = "first";
        Person person = new Person(1L, username, "surname", null, null, null, null);
        given(personRepository.findByUserUsername(username)).willReturn(person);

        // When
        Person getUsername = personService.getByUsername(username);

        // Then
        verify(personRepository).findByUserUsername(username);
        assertEquals(person, getUsername);
    }

    @Test(expected = PersonNotFoundException.class)
    public void shouldNotgetByUsername(){

        // Given
        String username = "first";
        Person person = null;
        given(personRepository.findByUserUsername(username)).willReturn(person);

        // When
        try{
            personService.getByUsername(username);
            Assert.fail("Expected an PersonNotFoundException to be thrown");
        }catch(PersonNotFoundException e){
        }

        // Then
        personService.getByUsername(username);
    }

    @Test
    public void shouldUpdateTest(){
        
        //Given
        Long personId = 1L;
        Long userId = 1L;

        User oldUser = new User(userId,"username1","password","confirmPassword",true,null,null);
        User newUser = new User(userId,"updated username","password","confirmPassword",false,null,null);
        
        Person OldPerson = new Person(personId, "name", "surname", oldUser, null, null, null);
        Person newPerson = new Person(personId, "updated name", "surname", newUser, null, null, null);
       
        given(personRepository.findById(personId)).willReturn(Optional.of(OldPerson));
        given(personRepository.save(OldPerson)).willReturn(OldPerson);

        given(userRepository.findById(userId)).willReturn(Optional.of(oldUser));
        given(userRepository.save(oldUser)).willReturn(oldUser);

        // When
        Person updatedPerson = personService.update(personId, newPerson);
        
        // Then
        verify(personRepository).findById(personId);
        verify(personRepository).save(OldPerson);
        assertEquals(newPerson, updatedPerson);

        verify(userRepository).findById(userId);
        verify(userRepository).save(oldUser);
        assertEquals(oldUser, updatedPerson.getUser());
    
    }

    @Test(expected = PersonNotFoundException.class)
    public void shouldNotUserUpdateTest(){

        //Given
        Long personId = 1L;
        Long userId = 1L;
        User oldUser = new User(userId,"username1","password","confirmPassword",true,null,null);
        Person oldPerson = new Person(personId, "name", "surname", oldUser, null, null, null);

        // When
        try {
            personService.update(personId, oldPerson);
            Assert.fail("Expected an PersonNotFoundException to be thrown");
        } catch (PersonNotFoundException e) {
        }

        // Then
        personService.update(personId, oldPerson);


    }

    @Test(expected = PersonNotFoundException.class)
    public void shouldNotPersonUpdateTest(){

        //Given
        Long personId = 1L;
        Long userId = 1L;
        User oldUser = new User(userId,"username1","password","confirmPassword",true,null,null);
        Person oldPerson = new Person(personId, "name", "surname", oldUser, null, null, null);
      
       given(userRepository.save(oldUser)).willReturn(oldUser);
       given(userRepository.findById(personId)).willReturn(Optional.of(oldUser));

        // When
        try {
            personService.update(personId, oldPerson);
            Assert.fail("Expected an PersonNotFoundException to be thrown");
        } catch (PersonNotFoundException e) {
        }

        // Then
        personService.update(personId, oldPerson);


    }
    
}
