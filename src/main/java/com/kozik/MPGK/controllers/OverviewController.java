package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.services.OverviewService;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class OverviewController {

    @Autowired private OverviewService overviewService;

    @GetMapping(value = "/overview/list")
    public String getAll(Model model){
        List<Overview> overviews = overviewService.listAll();
        model.addAttribute("overviews", overviews);
        return "views/overview/list";
    }

    @GetMapping(value="/overview/add")
    public String add(Model model) {
        Overview overview = new Overview();
        model.addAttribute("overview", overview);
        return "views/overview/add";
    }

    @PostMapping(value="/overview/add")
    public String add(@ModelAttribute("overview")Overview overview){
        overviewService.save(overview);
        return "redirect:/overview/list";
    }

    @GetMapping(value = "/overview/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        Overview overview = overviewService.get(id);
        model.addAttribute("overview", overview);
        return "views/overview/edit";
    }

    @PostMapping(value = "/overview/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("overview")Overview overview){
        overview.setOverviewId(id);
        overviewService.save(overview);
        return "redirect:/overview/list";
    }

    @GetMapping(value = "/overview/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        overviewService.delete(id);
        return "redirect:/overview/list";
    } 

}