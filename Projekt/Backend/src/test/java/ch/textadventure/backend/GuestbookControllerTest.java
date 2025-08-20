package ch.textadventure.backend;

import ch.textadventure.backend.controller.GuestbookController;
import ch.textadventure.backend.model.GuestbookEntry;
import ch.textadventure.backend.repository.GuestbookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Testklasse für den GuestbookController.
 */
public class GuestbookControllerTest {

    private GuestbookRepository guestbookRepository;
    private GuestbookController guestbookController;

    /**
     * Vor jedem Test: Repository mocken und Controller mit Mock initialisieren.
     */
    @BeforeEach
    void setUp() {
        guestbookRepository = mock(GuestbookRepository.class);
        guestbookController = new GuestbookController(guestbookRepository);
    }

    /**
     * Testet, ob ein Gästebucheintrag erfolgreich hinzugefügt wird.
     */
    @Test
    void testAddGuestbookEntry() {
        GuestbookEntry entry = new GuestbookEntry("Max", "Hallo Welt");

        when(guestbookRepository.save(any(GuestbookEntry.class))).thenReturn(entry);

        GuestbookEntry saved = guestbookController.addEntry(entry);

        assertNotNull(saved);
        assertEquals("Max", saved.getName());
        assertEquals("Hallo Welt", saved.getMessage());
    }

    /**
     * Testet, ob alle Gästebucheinträge korrekt zurückgegeben werden.
     */
    @Test
    void testGetAllEntries() {
        GuestbookEntry e1 = new GuestbookEntry("Alice", "Willkommen!");
        GuestbookEntry e2 = new GuestbookEntry("Bob", "Hallo zusammen!");

        when(guestbookRepository.findAll()).thenReturn(List.of(e1, e2));

        List<GuestbookEntry> entries = guestbookController.getAllEntries();

        assertEquals(2, entries.size());
        assertEquals("Alice", entries.get(0).getName());
        assertEquals("Bob", entries.get(1).getName());
    }

    /**
     * Testet, ob ein Eintrag korrekt gelöscht wird.
     */
    @Test
    void testDeleteEntry_CallsRepository() {
        Long id = 1L;

        guestbookController.deleteEntry(id);

        verify(guestbookRepository, times(1)).deleteById(id);
    }

    /**
     * Testet, ob ein bestehender Eintrag korrekt aktualisiert wird.
     */
    @Test
    void testUpdateEntry_Updated() {
        Long id = 1L;
        GuestbookEntry oldEntry = new GuestbookEntry("Max", "Alt");
        GuestbookEntry newEntry = new GuestbookEntry("Max", "Neu");

        when(guestbookRepository.findById(id)).thenReturn(Optional.of(oldEntry));
        when(guestbookRepository.save(any(GuestbookEntry.class))).thenReturn(newEntry);

        var result = guestbookController.updateEntry(id, newEntry);

        assertEquals("Neu", result.getBody().getMessage());
    }

    /**
     * Testet den Fall, dass der zu aktualisierende Eintrag nicht existiert.
     */
    @Test
    void testUpdateEntry_NotFound() {
        Long id = 999L;
        GuestbookEntry updatedEntry = new GuestbookEntry("Test", "Neu");

        when(guestbookRepository.findById(id)).thenReturn(Optional.empty());

        var result = guestbookController.updateEntry(id, updatedEntry);

        assertTrue(result.getStatusCode().is4xxClientError());
    }
}
