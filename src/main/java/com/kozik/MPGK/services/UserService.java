package com.kozik.MPGK.services;

import com.kozik.MPGK.repositories.UserRepository;
import com.kozik.MPGK.entities.Role;
import com.kozik.MPGK.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;

    public List<User> listAll(){
        return userRepository.findAll();
    }

    public void save(User user,List<Role> role){
        user.setRole(role);
        userRepository.save(user);
    }

    public void savee(User user){
        userRepository.save(user);
    }

    public User get(String username){
        return userRepository.findById(username).get();
    }

    public void delete(String username){
        userRepository.deleteById(username);
    }

    public Boolean isUserExist(String username){
        return userRepository.existsById(username);
    }

    public User update(String username,User user){
        User currentUser = get(username);
        currentUser.setUsername(user.getUsername());
        currentUser.setPassword(user.getPassword());
        currentUser.setEnabled(user.getEnabled());
        savee(currentUser);

        return currentUser;

    }
}