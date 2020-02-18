package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.repositories.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

   @Autowired RoleRepository roleRepository;

   public List<Role> listAll(){
       return roleRepository.findAll();
   }

   public void save(Role role){
       roleRepository.save(role);
   }
   
   public Role get(String name){
       return roleRepository.findById(name).get();
   }

   public void delete(String name){
       roleRepository.deleteById(name);
   }
}