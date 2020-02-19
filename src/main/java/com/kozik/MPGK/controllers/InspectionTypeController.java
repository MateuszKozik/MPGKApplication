package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.InspectionType;
import com.kozik.MPGK.services.InspectionTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class InspectionTypeController {

    @Autowired
    private InspectionTypeService inspectionTypeService;

    @GetMapping(value = "/inspectionType/list")
    public String getAll(Model model) {
        List<InspectionType> inspectionsType = inspectionTypeService.listAll();
        model.addAttribute("inspectionsType", inspectionsType);
        return "views/inspectionType/list";
    }

    @GetMapping(value = "/inspectionType/add")
    public String add(Model model){
        InspectionType inspectionType = new InspectionType();
        model.addAttribute("inspectionType", inspectionType);
        return "views/inspectionType/add";
    }

    @PostMapping(value = "/inspectionType/add")
    public String add(@ModelAttribute("inspectionType")InspectionType inspectionType){
        inspectionTypeService.save(inspectionType);
        return "redirect:/inspectionType/list";
    }

    @GetMapping(value = "/inspectionType/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        InspectionType inspectionType = inspectionTypeService.get(id);
        model.addAttribute("inspectionType", inspectionType);
        return "views/inspectionType/edit";
    }

    @PostMapping(value = "/inspectionType/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("inspectionType")InspectionType inspectionType){
        inspectionType.setTypeId(id);
        inspectionTypeService.save(inspectionType);
        return "redirect:/inspectionType/list";
    }

    @GetMapping(value = "/inspectionType/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        inspectionTypeService.delete(id);
        return "redirect:/inspectionType/list";  
    }  
}