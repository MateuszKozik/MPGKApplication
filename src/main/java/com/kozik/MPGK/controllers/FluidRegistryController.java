package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.services.FluidRegistryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FluidRegistryController {

    @Autowired private FluidRegistryService fluidRegistryService;

    @GetMapping(value = "/fluidRegistry/list")
    public String getAll(Model model){
        List<FluidRegistry> fluidsRegistry = fluidRegistryService.listAll();
        model.addAttribute("fluidsRegistry", fluidsRegistry);
        return "views/fluidRegistry/list";
    }

    @GetMapping(value = "/fluidRegistry/add")
    public String add(Model model){
        FluidRegistry fluidRegistry = new FluidRegistry();
        model.addAttribute("fluidRegistry", fluidRegistry);
        return "views/fluidRegistry/add";
    }

    @PostMapping(value = "/fluidRegistry/add")
    public String add(@ModelAttribute("fluidRegistry")FluidRegistry fluidRegistry){
        fluidRegistryService.save(fluidRegistry);
        return "redirect:/fluidRegistry/list";
    }
    
    @GetMapping(value = "/fluidRegistry/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        FluidRegistry fluidRegistry = fluidRegistryService.get(id);
        model.addAttribute("fluidRegistry", fluidRegistry);
        return "views/fluidRegistry/edit";
    }

    @PostMapping(value = "/fluidRegistry/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("fluidRegistry")FluidRegistry fluidRegistry){
        fluidRegistry.setRegistryId(id);
        fluidRegistryService.save(fluidRegistry);
        return "redirect:/fluidRegistry/list";
    }
    
    @GetMapping(value = "/fluidRegistry/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        fluidRegistryService.delete(id);
        return "redirect:/fluidRegistry/list";
    }
}