package ch.textadventure.backend;

import ch.textadventure.backend.controller.GuestbookController;
import ch.textadventure.backend.model.GuestbookEntry;
import ch.textadventure.backend.repository.GuestbookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;

public class GuestbookControllerTest {

    private GuestbookRepository guestbookRepository;
    private GuestbookController guestbookController;

    @BeforeEach
    void setUp() {
        guestbookRepository = mock(GuestbookRepository.class);
        guestbookController = new GuestbookController(guestbookRepository);
    }

    @Test
    void testAddGuestbookEntry() {
        GuestbookEntry entry = new GuestbookEntry();
        entry.setName("Max");
        entry.setMessage("Hallo Welt");

        when(guestbookRepository.save(any(GuestbookEntry.class))).thenReturn(entry);

        GuestbookEntry saved = guestbookController.addEntry(entry);

        assertNotNull(saved);
        assertEquals("Max", saved.getName());
        assertEquals("Hallo Welt", saved.getMessage());
    }
    
    @Test
    void testGetAllEntries() {
        GuestbookEntry entry1 = new GuestbookEntry();
        entry1.setName("Alice");
        entry1.setMessage("Hallo Alice");

        GuestbookEntry entry2 = new GuestbookEntry();
        entry2.setName("Bob");
        entry2.setMessage("Hallo Bob");

        List<GuestbookEntry> mockedList = List.of(entry1, entry2);

        when(guestbookRepository.findAll()).thenReturn(mockedList);

        List<GuestbookEntry> result = guestbookController.getAllEntries();

        assertEquals(2, result.size());
        assertEquals("Alice", result.get(0).getName());
        assertEquals("Bob", result.get(1).getName());
    }
    
    @Test
    void testDeleteEntry() {
        Long testId = 42L;

        // Führe deleteEntry aus
        guestbookController.deleteEntry(testId);

        // Verifiziere, dass deleteById mit der richtigen ID aufgerufen wurde
        verify(guestbookRepository, times(1)).deleteById(testId);
    }


}
