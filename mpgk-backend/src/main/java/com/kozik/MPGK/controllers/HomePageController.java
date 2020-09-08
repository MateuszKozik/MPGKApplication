package com.kozik.MPGK.controllers;

import java.util.ArrayList;

import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.utilities.ConnectionObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/home")
public class HomePageController {

    @Autowired
    private ConnectionService connectionService;

    @GetMapping("/connections")
    public ArrayList<ConnectionObject> getConnections() {
        return connectionService.getHomePageConnections();
    }
}