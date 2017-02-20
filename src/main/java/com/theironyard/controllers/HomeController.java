package com.theironyard.controllers;

import com.theironyard.entities.User;
import com.theironyard.services.PasswordStorage;
import com.theironyard.services.TripRepository;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
public class HomeController {
    @Autowired
    UserRepository users;

    @Autowired
    TripRepository trips;

//    @PostConstruct // Testing Purposes with a bit of humor
//    public void init() {
//        if (users.count() == 0) { // If repo is not populated at all do this
//            User user = new User(); // Creates user
//            user.setUserName("Zach"); // sets user name to Zach
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


    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String home(HttpSession session) {
        // check session for existing email
        String emailAddress = (String) session.getAttribute("emailAddress");
        User user = users.findByEmailAddress(emailAddress);
        // if email exists in session AND there is a valid user with that email
        if(session.getAttribute("emailAddress") != null && user != null) {
            return "../static/templates/loggedin"; // then render ../static/templates/index
        } else {
            return "../static/templates/index"; // else render ../static/templates/login
        }
    }


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public String login(HttpSession session, String emailAddress, String password) throws Exception {
        // see if user exists at that emailAddress
        User user = users.findByEmailAddress(emailAddress);
        // if so, compare existing password in database with value passed in (you're already doing this below)
        if ((user == null) || (!PasswordStorage.verifyPassword(password, user.getPassword()))){
            return "redirect:/";
        }
        // if user is present and password is valid, set email in session
        session.setAttribute("emailAddress", emailAddress);
        // redirect to the homepage
        return  "redirect:/";
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public String logout(HttpSession session) {
        session.invalidate();  // invalidate session
        return "redirect:/"; // redirect to homepage
    }

    @RequestMapping(path = "/new-user", method = RequestMethod.POST)
    public String newUser(HttpSession session, User current) throws Exception {
        // get user data from form
        User user = users.findByEmailAddress(current.getEmailAddress());
        // persist user data
        if(user == null) {
            user = new User(current.getUserName(), current.getEmailAddress(), PasswordStorage.createHash(current.getPassword()), current.getCar());
            users.save(user);  // save user email in session
            session.setAttribute("emailAddress", user.getEmailAddress());
        }
        return "redirect:/"; // redirect to the homepage
    }
}
