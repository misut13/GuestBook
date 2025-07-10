package ch.textadventure.backend.repository;

import ch.textadventure.backend.model.GuestbookEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestbookRepository extends JpaRepository<GuestbookEntry, Long> {
}
