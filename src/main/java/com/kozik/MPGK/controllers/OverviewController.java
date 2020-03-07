package com.kozik.MPGK.controllers;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.kozik.MPGK.entities.Activity;
import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.ActivityService;
import com.kozik.MPGK.services.OverviewService;
import com.kozik.MPGK.services.PersonService;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class OverviewController {

    @Autowired private OverviewService overviewService;

    @Autowired private PersonService personService;

    @Autowired private ActivityService activityService;

    @GetMapping(value = "/overview/list")
    public String getAll(Model model){
        List<Overview> overviews = overviewService.listAll();
        model.addAttribute("overviews", overviews);
        return "views/overview/list";
    }

    @GetMapping(value="/overview/add")
    public String add(Model model) {
        List<Person> personList = personService.listAll();
        List<Activity> activityList = activityService.listAll();
        Overview overview = new Overview();
        model.addAttribute("overview", overview);
        model.addAttribute("personList", personList);
        model.addAttribute("activityList", activityList);
        return "views/overview/add";
    }

    @PostMapping(value="/overview/add")
    public String add(@ModelAttribute("overview")Overview overview,
        @RequestParam(name="person")Person person,
        @RequestParam(name="supervisor")Person supervisor,
        @RequestParam(name="activity")Activity activity){
        overview.setPerson(person);
        overview.setSupervisor(supervisor);
        overview.setActivity(activity);
        LocalDateTime today = LocalDateTime.now().with(LocalTime.of(0,0));
        LocalDateTime now = LocalDateTime.now();
        overview.setStartTime(today.toString());
        overview.setEndTime(now.withNano(0).withSecond(0).toString());
        overviewService.save(overview);
        return "redirect:/overview/list";
    }

    @GetMapping(value = "/overview/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        List<Person> personList = personService.listAll();
        List<Activity> activityList = activityService.listAll();
        Overview overview = overviewService.get(id);
        model.addAttribute("overview", overview);
        model.addAttribute("personList", personList);
        model.addAttribute("activityList", activityList);
        return "views/overview/edit";
    }

    @PostMapping(value = "/overview/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("overview")Overview overview,
        @RequestParam(name="person")Person person,
        @RequestParam(name="supervisor")Person supervisor,
        @RequestParam(name="activity")Activity activity){
        overview.setOverviewId(id);
        overview.setPerson(person);
        overview.setSupervisor(supervisor);
        overview.setActivity(activity);
        overviewService.save(overview);
        return "redirect:/overview/list";
    }

    @GetMapping(value = "/overview/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        overviewService.delete(id);
        return "redirect:/overview/list";
    } 

}