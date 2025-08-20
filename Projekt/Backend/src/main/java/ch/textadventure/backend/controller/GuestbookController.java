package ch.textadventure.backend.controller;

import ch.textadventure.backend.model.GuestbookEntry;
import ch.textadventure.backend.repository.GuestbookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST-Controller zur Verwaltung von Gästebuch-Einträgen.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    private final GuestbookRepository repository;

    /**
     * Konstruktor mit Repository-Injektion.
     *
     * @param repository das Gästebuch-Repository
     */
    public GuestbookController(GuestbookRepository repository) {
        this.repository = repository;
    }

    /**
     * Gibt alle Gästebuch-Einträge zurück.
     *
     * @return Liste aller Einträge
     */
    @GetMapping
    public List<GuestbookEntry> getAllEntries() {
        return repository.findAll();
    }

    /**
     * Erstellt einen neuen Gästebuch-Eintrag.
     *
     * @param entry der zu speichernde Eintrag (validiert)
     * @return der gespeicherte Eintrag
     */
    @PostMapping
    public GuestbookEntry addEntry(@Valid @RequestBody GuestbookEntry entry) {
        return repository.save(entry);
    }

    /**
     * Löscht einen Eintrag anhand seiner ID.
     *
     * @param id ID des zu löschenden Eintrags
     */
    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        repository.deleteById(id);
    }

    /**
     * Aktualisiert einen bestehenden Eintrag.
     *
     * @param id           ID des zu aktualisierenden Eintrags
     * @param updatedEntry neue Eintragsdaten (validiert)
     * @return aktualisierter Eintrag oder 404, falls nicht gefunden
     */
    @PutMapping("/{id}")
    public ResponseEntity<GuestbookEntry> updateEntry(@PathVariable Long id,
                                                      @Valid @RequestBody GuestbookEntry updatedEntry) {
        return repository.findById(id)
                .map(entry -> {
                    entry.setName(updatedEntry.getName());
                    entry.setMessage(updatedEntry.getMessage());
                    repository.save(entry);
                    return ResponseEntity.ok(entry);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
