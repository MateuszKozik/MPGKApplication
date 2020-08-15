package com.kozik.MPGK.controllers;

import java.util.ArrayList;

import com.kozik.MPGK.services.HomePageService;
import com.kozik.MPGK.utilities.PeriodicConnectionObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomePageController {

    @Autowired
    private HomePageService homePageService;

    @GetMapping("/periodic")
    public ArrayList<PeriodicConnectionObject> getPeriodic() {
        return homePageService.getPeriodic();
    }
}