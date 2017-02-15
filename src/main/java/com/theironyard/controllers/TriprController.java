package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.services.PasswordStorage;
import com.theironyard.services.TripRepository;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;

@RestController
public class TriprController {
    @Autowired
    UserRepository users; //Repo for users

    @Autowired
    TripRepository trips; //Repo for trips

    @Autowired
    RestTemplate template;


//    @PostConstruct // Testing Purposes with a bit of humor
//    public void init() {
//        if (users.count() == 0) { // If repo is not populated at all do this
//            User user = new User(); // Creates user
//            user.setName("Zach"); // sets user name to Zach
//            user.setEmail("zach@gmail.com");
//            user.setCar("Tesla");
//            try {
//                user.setPass(PasswordStorage.createHash("hunter2")); // Creates a password
//            } catch (PasswordStorage.CannotPerformOperationException e) {
//                e.printStackTrace();
//            }
//
//            users.save(user); // saves this user into the Repo
//        }
//    }

//    @CrossOrigin
//    @RequestMapping(path = "/", method = RequestMethod.GET) // This is for testing purposes for the HTML
//    public User home(HttpSession session) {
//        //init();
//        String email = (String) session.getAttribute("email");
//        User user = users.findByEmail(email);
//        if (session.getAttribute("email") != null) {
//            return user;
//        }
//        return user;
//    }

    @CrossOrigin
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login(@RequestParam(value = "email") String email, @RequestParam(value = "pass") String pass) throws Exception {
        User user = users.findByEmail(email);
        if ((user == null) || (!PasswordStorage.verifyPassword(pass, user.getPass()))){
            throw new Exception();
        }
//        session.setAttribute("email", email);
        return user;
    }

    @CrossOrigin
    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public String logout(HttpSession session) {
        session.invalidate();
        return "login.html";
    }

    @CrossOrigin
    @RequestMapping(path = "/new-user", method = RequestMethod.POST)
    public boolean newUser(@RequestBody User current) throws Exception {
        User user = users.findByEmail(current.getEmail());

        if(user == null) {
            user = new User(current.getName(), current.getEmail(), PasswordStorage.createHash(current.getPass()), current.getCar());
            users.save(user);
            //session.setAttribute("email", email);
            return true;

        }
        return false;
    }


}
