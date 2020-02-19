package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.services.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RoleController {

    @Autowired private RoleService roleService;

    @GetMapping(value = "/role/list")
    public String getAll(Model model){
        List<Role> roles = roleService.listAll();
        model.addAttribute("roles", roles);
        return "views/role/list";
    }

    @GetMapping(value = "/role/add")
    public String add(Model model){
        Role role = new Role();
        model.addAttribute("role", role);
        return "views/role/add";
    }

    @PostMapping(value = "/role/add")
    public String add(@ModelAttribute("role")Role role){
        roleService.save(role);
        return "redirect:/role/list";
    }

    @GetMapping(value = "role/delete/{name}")
    public String delete(@PathVariable("name")String name){
        roleService.delete(name);
        return "redirect:/role/list";
    }  
}