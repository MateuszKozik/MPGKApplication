package com.kozik.MPGK.controllers;

import java.util.ArrayList;
import java.util.List;
import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.entities.User;
import com.kozik.MPGK.services.RoleService;
import com.kozik.MPGK.services.UserService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    @Autowired private UserService userService;
    @Autowired private RoleService roleService;   
    
    @GetMapping(value = "/user/list")
    public String getAll(Model model){
        List<User> users = userService.listAll();
        model.addAttribute("users", users);
        return "views/user/list";
    }

    @GetMapping(value="/user/add")
    public String add(Model model) {
        List<Role> roleList = roleService.listAll();
        User user = new User();
        model.addAttribute("user", user);
        model.addAttribute("roleList", roleList);
        return "views/user/add";
    }
    
    @PostMapping(value="/user/add")
    public String add(@ModelAttribute("user")User user,
        @RequestParam(name="roles",required = false)ArrayList<Role> roles){
        userService.save(user,roles);
        return "redirect:/user/list";
    }

    @GetMapping(value = "/user/edit/{username}")
    public String edit(@PathVariable("username")String username, Model model){
        List<Role> roleList = roleService.listAll();
        User user = userService.get(username);
        model.addAttribute("user", user);
        model.addAttribute("roleList", roleList);
        return "views/user/edit";
    }

    @PostMapping(value = "/user/edit/{username}")
    public String edit(@PathVariable("username")String username,
        @ModelAttribute("user")User user,
        @RequestParam(name="roles", required = false)ArrayList<Role> roleList){
        user.setUsername(username);
        userService.save(user,roleList);
        return "redirect:/user/list";
    }

    @GetMapping(value = "/user/delete/{username}")
    public String delete(@PathVariable("username")String username){
        userService.delete(username);
        return "redirect:/user/list";
    }

}