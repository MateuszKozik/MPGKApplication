package com.kozik.MPGK.controllers;

import org.springframework.http.HttpHeaders;
import java.util.List;

import com.kozik.MPGK.entities.User;
import com.kozik.MPGK.services.UserService;
import com.kozik.MPGK.utilities.ErrorMessage;

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
public class UserController {

    @Autowired private UserService userService;

    //Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.listAll();
        if(users.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    //Get single user
    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUser(@PathVariable("username")String username){
        if(!userService.isUserExist(username)){
            return new ResponseEntity<>(new ErrorMessage("User with name " + username + " not found."),
            HttpStatus.NOT_FOUND);
        }
        User user = userService.get(username);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    //Create user
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder builder){
        String username = user.getUsername();
        if(userService.isUserExist(username)){
            return new ResponseEntity<>(new ErrorMessage("Unable to create. User with name " + username 
            + " already exist."), HttpStatus.CONFLICT);
        }
        userService.savee(user);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/users/{username}").buildAndExpand(user.getUsername()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Update user
    @PutMapping("/users/{username}")
    public ResponseEntity<?> updateUser(@PathVariable("username")String username, @RequestBody User user){
        if(!userService.isUserExist(username)){
            return new ResponseEntity<>(new ErrorMessage("Unable to update. User with name " + username + " not found."),
            HttpStatus.NOT_FOUND);
        }
        User currentUser = userService.update(username,user);
        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
    }

    //Delete user
    @DeleteMapping("/users/{username}")
    public ResponseEntity<?> deleteFluid(@PathVariable("username")String username){
        if(!userService.isUserExist(username)){
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. User with name " + username + " not found"),
            HttpStatus.NOT_FOUND);
        }
        userService.delete(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}