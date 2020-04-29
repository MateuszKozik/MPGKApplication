package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.services.RoleService;
import com.kozik.MPGK.utilities.ErrorMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class RoleController {

    @Autowired private RoleService roleService;

    //Get all roles
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        List<Role> roles = roleService.listAll();
        if (roles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Role>>(roles, HttpStatus.OK);
    }

    //Get single role
    @GetMapping("/roles/{name}")
    public ResponseEntity<?> getRole(@PathVariable("name") String name) {
        if (!roleService.isRoleExist(name)) {
            return new ResponseEntity<>(new ErrorMessage("Role with name " + name + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        Role role = roleService.get(name);
        return new ResponseEntity<Role>(role, HttpStatus.OK);
    }

    //Create role
    @PostMapping("/roles")
    public ResponseEntity<?> createRole(@RequestBody Role role, UriComponentsBuilder builder) {
        String name = role.getName();
        if (roleService.isRoleExist(name)) {
            return new ResponseEntity<>(
                    new ErrorMessage("Unable to create. A Role with name " + name + " already exist."),
                    HttpStatus.CONFLICT);
        }
        roleService.save(role);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/api/roles/{name}").buildAndExpand(role.getName()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //Delete role
    @DeleteMapping("/roles/{name}")
    public ResponseEntity<?> deleteRole(@PathVariable("name") String name) {
        if (!roleService.isRoleExist(name)) {
            return new ResponseEntity<>(new ErrorMessage("Unable to delete. Role with name " + name + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        roleService.delete(name);
        return new ResponseEntity<Role>(HttpStatus.NO_CONTENT);
    }
}