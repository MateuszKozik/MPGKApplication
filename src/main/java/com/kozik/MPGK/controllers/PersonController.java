package com.kozik.MPGK.controllers;

import java.util.List;

import com.kozik.MPGK.entities.Person;
import com.kozik.MPGK.services.PersonService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PersonController {

    @Autowired private PersonService personService;

    @GetMapping(value = "/person/list")
    public String getAll(Model model){
        List<Person> persons = personService.listAll();
        model.addAttribute("persons", persons);
        return "views/person/list";
    }

    @GetMapping(value="/person/add")
    public String add(Model model) {
        Person person = new Person();
        model.addAttribute("person", person);
        return "views/person/add";
    }
    
    @PostMapping(value="/person/add")
    public String add(@ModelAttribute("person")Person person){
        personService.save(person);
        return "redirect:/person/list";
    }

    @GetMapping(value = "/person/edit/{id}")
    public String edit(@PathVariable("id")Long id, Model model){
        Person person = personService.get(id);
        model.addAttribute("person", person);
        return "views/person/edit";
    }

    @PostMapping(value = "/person/edit/{id}")
    public String edit(@PathVariable("id")Long id,
    @ModelAttribute("person")Person person){
        person.setPersonId(id);
        personService.save(person);
        return "redirect:/person/list";
    }

    @GetMapping(value = "/person/delete/{id}")
    public String delete(@PathVariable("id")Long id){
        personService.delete(id);
        return "redirect:/person/list";
    }
}