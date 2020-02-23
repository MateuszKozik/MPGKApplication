package com.kozik.MPGK.controllers;

import java.time.LocalDateTime;
import java.util.List;

import com.kozik.MPGK.entities.Device;
import com.kozik.MPGK.entities.Fluid;
import com.kozik.MPGK.entities.FluidRegistry;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.DeviceService;
import com.kozik.MPGK.services.FluidRegistryService;
import com.kozik.MPGK.services.FluidService;
import com.kozik.MPGK.services.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FluidRegistryController {

    @Autowired private FluidRegistryService fluidRegistryService;
    @Autowired private PersonService personService;
    @Autowired private FluidService fluidService;
    @Autowired private DeviceService deviceService;

    @GetMapping(value = "/fluidRegistry/list")
    public String getAll(Model model){
        List<FluidRegistry> fluidsRegistry = fluidRegistryService.listAll();
        model.addAttribute("fluidsRegistry", fluidsRegistry);
        return "views/fluidRegistry/list";
    }

    @GetMapping(value = "/fluidRegistry/add")
    public String add(Model model){
        List<Person> persons = personService.listAll();
        List<Fluid> fluids = fluidService.listAll();
        List<Device> devices = deviceService.listAll();
        FluidRegistry fluidRegistry = new FluidRegistry();
        model.addAttribute("fluidRegistry", fluidRegistry);
        model.addAttribute("persons", persons);
        model.addAttribute("fluids", fluids);
        model.addAttribute("devices", devices);
        return "views/fluidRegistry/add";
    }

    @PostMapping(value = "/fluidRegistry/add")
    public String add(@ModelAttribute("fluidRegistry")FluidRegistry fluidRegistry,
    @RequestParam(name = "person", required = false)Person person,
    @RequestParam(name = "fluid", required = false)Fluid fluid,
    @RequestParam(name = "device", required = false)Device device){
        fluidRegistry.setPerson(person);
        fluidRegistry.setFluid(fluid);
        fluidRegistry.setDevice(device);
        LocalDateTime now = LocalDateTime.now();
        fluidRegistry.setDatetime(now.withNano(0).withSecond(0).toString());
        fluidRegistryService.save(fluidRegistry);
        return "redirect:/fluidRegistry/list";
    }
    
    @GetMapping(value = "/fluidRegistry/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        List<Person> persons = personService.listAll();
        List<Fluid> fluids = fluidService.listAll();
        List<Device> devices = deviceService.listAll();
        FluidRegistry fluidRegistry = fluidRegistryService.get(id);
        model.addAttribute("fluidRegistry", fluidRegistry);
        model.addAttribute("persons", persons);
        model.addAttribute("fluids", fluids);
        model.addAttribute("devices", devices);
        return "views/fluidRegistry/edit";
    }

    @PostMapping(value = "/fluidRegistry/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("fluidRegistry")FluidRegistry fluidRegistry,
    @RequestParam(name = "person", required = false)Person person,
    @RequestParam(name = "fluid", required = false)Fluid fluid,
    @RequestParam(name = "device", required = false)Device device){
        fluidRegistry.setRegistryId(id);
        fluidRegistry.setPerson(person);
        fluidRegistry.setFluid(fluid);
        fluidRegistry.setDevice(device);
        fluidRegistryService.save(fluidRegistry);
        return "redirect:/fluidRegistry/list";
    }
    
    @GetMapping(value = "/fluidRegistry/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        fluidRegistryService.delete(id);
        return "redirect:/fluidRegistry/list";
    }
}