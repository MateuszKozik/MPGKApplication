package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Agent;
import com.kozik.MPGK.repositories.AgentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgentService {
    @Autowired private AgentRepository agentRepository;

    public List<Agent> listAll(){
        return agentRepository.findAll();
    }

    public void save(Agent agent){
        agentRepository.save(agent);
    }

    public Agent get(Long id){
        return agentRepository.findById(id).get();
    }

    public void delete(Long id){
        agentRepository.deleteById(id);
    }
}