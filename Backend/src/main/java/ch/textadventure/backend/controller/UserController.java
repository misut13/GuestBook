package ch.textadventure.backend.controller;

import ch.textadventure.backend.model.User;
import ch.textadventure.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return repository.save(user);
    }

    // ✅ Benutzer überprüfen anhand von Name + E-Mail + Passwort
    @PostMapping("/verify")
    public boolean verifyUser(@RequestBody User input) {
        return repository.findAll().stream()
                .anyMatch(user ->
                        user.getName().equals(input.getName()) &&
                        user.getEmail().equals(input.getEmail()) &&
                        user.getPassword().equals(input.getPassword()));
    }
}
