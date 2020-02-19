package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.services.ActivityGroupService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ActivityGroupController {

    @Autowired private ActivityGroupService activityGroupService;

    @GetMapping(value = "/activityGroup/list")
    public String getAll(Model model){
        List<ActivityGroup> activitiesGroups = activityGroupService.listAll();
        model.addAttribute("activitiesGroups", activitiesGroups);
        return "views/activityGroup/list";
    }

    @GetMapping(value="/activityGroup/add")
    public String add(Model model) {
        ActivityGroup activityGroup = new ActivityGroup();
        model.addAttribute("activityGroup", activityGroup);
        return "views/activityGroup/add";
    }
    
    @PostMapping(value="/activityGroup/add")
    public String add(@ModelAttribute("activityGroup")ActivityGroup activityGroup){
        activityGroupService.save(activityGroup);
        return "redirect:/activityGroup/list";
    }

    @GetMapping(value = "/activityGroup/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        ActivityGroup activityGroup = activityGroupService.get(id);
        model.addAttribute("activityGroup", activityGroup);
        return "views/activityGroup/edit";
    }

    @PostMapping(value = "/activityGroup/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("fluactivityGroupid")ActivityGroup activityGroup){
        activityGroup.setGroupId(id);
        activityGroupService.save(activityGroup);
        return "redirect:/activityGroup/list";
    }

    @GetMapping(value = "/activityGroup/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        activityGroupService.delete(id);
        return "redirect:/activityGroup/list";
    } 
}