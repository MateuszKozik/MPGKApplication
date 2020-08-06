package com.kozik.MPGK.controllers;

import javax.validation.Valid;

import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.services.MapValidationErrorService;
import com.kozik.MPGK.services.RoleService;
import com.kozik.MPGK.utilities.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all roles
    @GetMapping("")
    public Iterable<Role> getRoles() {
        return roleService.listAll();
    }

    // Get single role
    @GetMapping("/{name}")
    public ResponseEntity<?> getRole(@PathVariable String name) {
        return new ResponseEntity<Role>(roleService.get(name), HttpStatus.OK);
    }

    // Create role
    @PostMapping("")
    public ResponseEntity<?> createRole(@Valid @RequestBody Role role, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<Role>(roleService.save(role), HttpStatus.CREATED);
    }

    // Delete role
    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteRole(@PathVariable String name) {
        roleService.delete(name);
        return new ResponseEntity<Message>(new Message("Role with name: " + name + " has been removed."),
                HttpStatus.OK);
    }
}