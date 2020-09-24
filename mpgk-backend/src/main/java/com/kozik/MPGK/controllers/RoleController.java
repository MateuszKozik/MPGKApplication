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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
@Api(tags = "roles", description = "Operations about role")
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    // Get all roles
    @ApiOperation(value = "Get all roles")
    @GetMapping("")
    public Iterable<Role> getRoles() {
        return roleService.listAll();
    }

    // Get single role
    @ApiOperation(value = "Get role by id")
    @GetMapping("/{roleId}")
    public ResponseEntity<?> getRole(
            @ApiParam(value = "Unique id of role", example = "123") @PathVariable Long roleId) {
        return new ResponseEntity<>(roleService.get(roleId), HttpStatus.OK);
    }

    // Create role
    @ApiOperation(value = "Create new role")
    @PostMapping("")
    public ResponseEntity<?> createRole(@ApiParam(value = "Created role object") @Valid @RequestBody Role role,
            BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.MapValidationService(result);
        }

        return new ResponseEntity<>(roleService.save(role), HttpStatus.CREATED);
    }

    // Delete role
    @ApiOperation(value = "Delete role")
    @DeleteMapping("/{roleId}")
    public ResponseEntity<?> deleteRole(
            @ApiParam(value = "Id that need to be deleted", example = "123") @PathVariable Long roleId) {
        roleService.delete(roleId);
        return new ResponseEntity<>(new Message("Role with id: " + roleId + " has been removed."), HttpStatus.OK);
    }
}