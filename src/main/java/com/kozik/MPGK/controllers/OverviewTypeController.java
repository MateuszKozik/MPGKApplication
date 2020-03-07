package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.OverviewType;
import com.kozik.MPGK.services.OverviewTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class OverviewTypeController {

    @Autowired
    private OverviewTypeService overviewTypeService;

    @GetMapping(value = "/overviewType/list")
    public String getAll(Model model) {
        List<OverviewType> overviewTypes = overviewTypeService.listAll();
        model.addAttribute("overviewTypes", overviewTypes);
        return "views/overviewType/list";
    }

    @GetMapping(value = "/overviewType/add")
    public String add(Model model){
        OverviewType overviewType = new OverviewType();
        model.addAttribute("overviewType", overviewType);
        return "views/overviewType/add";
    }

    @PostMapping(value = "/overviewType/add")
    public String add(@ModelAttribute("overviewType")OverviewType overviewType){
        overviewTypeService.save(overviewType);
        return "redirect:/overviewType/list";
    }

    @GetMapping(value = "/overviewType/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        OverviewType overviewType = overviewTypeService.get(id);
        model.addAttribute("overviewType", overviewType);
        return "views/overviewType/edit";
    }

    @PostMapping(value = "/overviewType/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("overviewType")OverviewType overviewType){
        overviewType.setTypeId(id);
        overviewTypeService.save(overviewType);
        return "redirect:/overviewType/list";
    }

    @GetMapping(value = "/overviewType/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        overviewTypeService.delete(id);
        return "redirect:/overviewType/list";  
    }  
}