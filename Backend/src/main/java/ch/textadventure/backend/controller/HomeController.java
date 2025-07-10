package ch.textadventure.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Gästebuch Backend läuft!";
    }
}
