package ch.textadventure.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stellt eine einfache Statusmeldung des Backends zur Verfügung.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HomeController {

    /**
     * Gibt eine Bestätigung zurück, dass das Backend läuft.
     *
     * @return Begrüßungsnachricht
     */
    @GetMapping("/")
    public String home() {
        return "Gästebuch Backend läuft!";
    }
}
