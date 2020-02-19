package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Connection;
import com.kozik.MPGK.services.ConnectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ConnectionController {

    @Autowired private ConnectionService connectionService;

    @GetMapping(value = "/connection/list")
    public String getAll(Model model){
        List<Connection> connections = connectionService.listAll();
        model.addAttribute("connections", connections);
        return "views/connection/list";
    }

    @GetMapping(value = "/connection/add")
    public String add(Model model){
        Connection connection = new Connection();
        model.addAttribute("connection", connection);
        return "views/connection/add";
    }

    @PostMapping(value = "/connection/add")
    public String add(@ModelAttribute("connection")Connection connection){
        connectionService.save(connection);
     
    }

    @GetMapping(value = "/connection/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        Connection connection = connectionService.get(id);
        model.addAttribute("connection", connection);
        return "views/connection/edit";
    }

    @PostMapping(value = "/connection/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("connection")Connection connection){
        connection.setConnectionId(id);
        connectionService.save(connection);
        return "redirect:/connection/list";
    }

    @GetMapping(value = "/connection/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        connectionService.delete(id);
        return "redirect:/connection/list";
    }
}