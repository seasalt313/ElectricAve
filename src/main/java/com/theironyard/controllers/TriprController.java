package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.services.PasswordStorage;
import com.theironyard.services.TripRepository;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
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
//                user.setPassword(PasswordStorage.createHash("hunter2")); // Creates a password
//            } catch (PasswordStorage.CannotPerformOperationException e) {
//                e.printStackTrace();
//            }
//
//            users.save(user); // saves this user into the Repo
//        }
//    }

    @CrossOrigin
    @RequestMapping(path = "/", method = RequestMethod.GET) // This is for testing purposes for the HTML
    public String home(HttpSession session) {
        //init();
//        String email = (String) session.getAttribute("email");
//        User user = users.findByEmail(email);
        if (session.getAttribute("email") != null) {
            return "create";
        }
        return "new-user";
    }

    @CrossOrigin
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public String login(@RequestBody HttpSession session, String email, String pass) throws Exception {
        User user = users.findByEmail(email);
        if ((user == null) || (!PasswordStorage.verifyPassword(pass, user.getPassword()))){
            return "redirect:/";
        }
        session.setAttribute("email", email);
        return "redirect:/";
    }

    @CrossOrigin
    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @CrossOrigin
    @RequestMapping(path = "/new-user", method = RequestMethod.POST)
    public String newUser(@RequestBody String name, String email, String pass, String car, HttpSession session) throws Exception {
        User user = users.findByEmail(email);

        if(user == null) {
            user = new User(name, email, PasswordStorage.createHash(pass), car);
            users.save(user);
            session.setAttribute("email", email);
            return "redirect:/";

        }
        return "redirect:/";
    }


}
