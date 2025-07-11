package ch.textadventure.backend.controller;

import ch.textadventure.backend.model.User;
import ch.textadventure.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
     * @return ResponseEntity mit true bei Erfolg, 401 bei Fehler
     */
    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyUser(@Valid @RequestBody User input) {
        boolean isValid = repository.findAll().stream().anyMatch(user ->
            user.getName().equals(input.getName()) &&
            user.getEmail().equals(input.getEmail()) &&
            user.getPassword().equals(input.getPassword())
        );

        if (isValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }
}
