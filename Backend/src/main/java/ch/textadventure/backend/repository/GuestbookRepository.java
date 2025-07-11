package ch.textadventure.backend.repository;

import ch.textadventure.backend.model.GuestbookEntry;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository-Interface für den Zugriff auf GuestbookEntry-Daten in der Datenbank.
// JpaRepository stellt alle Standard-CRUD-Methoden zur Verfügung (save, findById, delete, usw.).
public interface GuestbookRepository extends JpaRepository<GuestbookEntry, Long> {
}
