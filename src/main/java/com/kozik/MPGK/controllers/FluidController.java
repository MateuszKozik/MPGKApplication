package com.kozik.MPGK.controllers;

import java.util.List;
import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.services.FluidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FluidController {

    @Autowired private FluidService fluidService;

    @GetMapping(value = "/fluid/list")
    public String getAll(Model model){
        List<Fluid> fluids = fluidService.listAll();
        model.addAttribute("fluids", fluids);
        return "views/fluid/list";
    }

    @GetMapping(value="/fluid/add")
    public String add(Model model) {
        Fluid fluid = new Fluid();
        model.addAttribute("fluid", fluid);
        return "views/fluid/add";
    }
    
    @PostMapping(value="/fluid/add")
    public String add(@ModelAttribute("fluid")Fluid fluid){
        fluidService.save(fluid);
        return "redirect:/fluid/list";
    }

    @GetMapping(value = "/fluid/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        Fluid fluid = fluidService.get(id);
        model.addAttribute("fluid", fluid);
        return "views/fluid/edit";
    }

    @PostMapping(value = "/fluid/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("fluid")Fluid fluid){
        fluid.setFluidId(id);
        fluidService.save(fluid);
        return "redirect:/fluid/list";
    }

    @GetMapping(value = "/fluid/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        fluidService.delete(id);
        return "redirect:/fluid/list";
    }    
}