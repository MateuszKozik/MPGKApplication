package com.kozik.MPGK.services;

import java.util.List;

import com.kozik.MPGK.entities.Overview;
import com.kozik.MPGK.repositories.OverviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewService {
    @Autowired private OverviewRepository overviewRepository;

    public List<Overview> listAll(){
        return overviewRepository.findAll();
    }

    public void save(Overview overview){
        overviewRepository.save(overview);
    }

    public Overview get(Long id){
        return overviewRepository.findById(id).get();
    }

    public void delete(Long id){
        overviewRepository.deleteById(id);
    }
}