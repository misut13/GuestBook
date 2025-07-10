package ch.textadventure.backend.controller;

import ch.textadventure.backend.model.User;
import ch.textadventure.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST-Controller zur Verwaltung von Benutzern.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repository;

    /**
     * Konstruktor mit Repository-Injektion.
     *
     * @param repository das Benutzer-Repository
     */
    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Gibt alle Benutzer zurück.
     *
     * @return Liste aller Benutzer
     */
    @GetMapping
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    /**
     * Erstellt einen neuen Benutzer.
     *
     * @param user Benutzerobjekt (validiert)
     * @return gespeicherter Benutzer
     */
    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return repository.save(user);
    }

    /**
     * Verifiziert einen Benutzer anhand von Name, E-Mail und Passwort.
     *
     * @param input Eingabedaten des Benutzers (validiert)
     * @return true, wenn Benutzer existiert und übereinstimmt; sonst false
     */
    @PostMapping("/verify")
    public boolean verifyUser(@Valid @RequestBody User input) {
        return repository.findAll().stream()
                .anyMatch(user ->
                        user.getName().equals(input.getName()) &&
                        user.getEmail().equals(input.getEmail()) &&
                        user.getPassword().equals(input.getPassword()));
    }
}
