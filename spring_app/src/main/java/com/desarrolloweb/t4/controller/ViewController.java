package com.desarrolloweb.t4.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    
    @GetMapping("/")
    public String index() {
        return "index-simple";
    }
    
    @GetMapping("/avisos")
    public String avisosList() {
        return "avisos-list";
    }
}

