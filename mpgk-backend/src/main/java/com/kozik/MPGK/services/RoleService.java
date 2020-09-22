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
        if (role.getRoleId() != null) {
            throw new RoleAlreadyExistException(role.getRoleId());
        }
        return roleRepository.save(role);
    }

    public Role get(Long roleId) {
        return roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
    }

    public void delete(Long roleId) {
        roleRepository.delete(get(roleId));
    }

    public Boolean isRoleExist(Long roleId) {
        return roleRepository.existsById(roleId);
    }
}