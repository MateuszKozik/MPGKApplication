package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.ActivityGroup;
import com.kozik.MPGK.services.ActivityGroupService;
import com.kozik.MPGK.services.ActivityService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ActivityController {

    @Autowired private ActivityService activityService;

    @Autowired private ActivityGroupService activityGroupService;

    @GetMapping(value = "/activity/list")
    public String getAll(Model model){
        List<Activity> activities = activityService.listAll();
        model.addAttribute("activities", activities);
        return "views/activity/list";
    }

    @GetMapping(value="/activity/add")
    public String add(Model model) {
        List<ActivityGroup> activityGroupList = activityGroupService.listAll();
        Activity activity = new Activity();
        model.addAttribute("activity", activity);
        model.addAttribute("activityGroupList", activityGroupList);
        return "views/activity/add";
    }
    
    @PostMapping(value="/activity/add")
    public String add(@ModelAttribute("activity")Activity activity,
        @RequestParam(name="activityGroup")ActivityGroup activityGroup){
        activity.setActivityGroup(activityGroup);
        activityService.save(activity);
        return "redirect:/activity/list";
    }

    @GetMapping(value = "/activity/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        Activity activity = activityService.get(id);
        model.addAttribute("activity", activity);
        return "views/activity/edit";
    }

    @PostMapping(value = "/activity/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("activity")Activity activity){
    activity.setActivityId(id);
        activityService.save(activity);
        return "redirect:/activity/list";
    }

    @GetMapping(value = "/activity/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        activityService.delete(id);
        return "redirect:/activity/list";
    } 
}