package com.kozik.MPGK.services;

import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.exceptions.roleExceptions.RoleAlreadyExistException;
import com.kozik.MPGK.exceptions.roleExceptions.RoleNotFoundException;
import com.kozik.MPGK.repositories.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public Iterable<Role> listAll() {
        return roleRepository.findAll();
    }

    public Role save(Role role) {
        if (roleRepository.existsById(role.getName())) {
            throw new RoleAlreadyExistException(role.getName());
        }
        return roleRepository.save(role);
    }

    public Role get(String name) throws RoleNotFoundException {
        Role role = roleRepository.findById(name).orElseThrow(() -> new RoleNotFoundException(name));
        return role;
    }

    public void delete(String name) {
        roleRepository.delete(get(name));
    }

    public Boolean isRoleExist(String name) {
        return roleRepository.existsById(name);
    }
}