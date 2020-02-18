package com.kozik.MPGK.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class IndexController {
    @GetMapping(value = "/")
    public String showHomePage(Model model){
        return "/main_layout";
    }
    
}