package ch.textadventure.backend.repository;

import ch.textadventure.backend.model.GuestbookEntry;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository-Interface für den Zugriff auf {@link GuestbookEntry}-Daten in der Datenbank.
 * <p>
 * Bietet alle Standardmethoden wie {@code save()}, {@code findById()}, {@code findAll()},
 * {@code deleteById()} usw., um Gästebucheinträge zu verwalten.
 */
public interface GuestbookRepository extends JpaRepository<GuestbookEntry, Long> {
}
