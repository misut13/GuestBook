package ch.textadventure.backend.controller;

import ch.textadventure.backend.model.GuestbookEntry;
import ch.textadventure.backend.repository.GuestbookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    private final GuestbookRepository repository;

    public GuestbookController(GuestbookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<GuestbookEntry> getAllEntries() {
        return repository.findAll();
    }

    @PostMapping
    public GuestbookEntry addEntry(@RequestBody GuestbookEntry entry) {
        return repository.save(entry);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
