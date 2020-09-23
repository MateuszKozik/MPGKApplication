package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.services.ConnectionService;
import com.kozik.MPGK.utilities.ConnectionObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@Api(tags = "homepage", description = "Operations about homepage")
@RequestMapping("/api/home")
public class HomePageController {

    @Autowired
    private ConnectionService connectionService;

    @ApiOperation(value = "Get all inspection for the homepage")
    @GetMapping("/connections")
    public List<ConnectionObject> getConnections() {
        return connectionService.getHomePageConnections();
    }
}