package com.theironyard.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String home(String pants) {
//        if (pants != null && pants.equals("true")) {
            return "../static/templates/index";
//        } else {
//            return "../static/templates/login";
//        }

    }
}
