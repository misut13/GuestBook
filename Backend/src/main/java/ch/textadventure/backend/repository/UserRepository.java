package ch.textadventure.backend.repository;

import ch.textadventure.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository-Interface für den Zugriff auf User-Daten in der Datenbank.
// JpaRepository stellt alle Standard-CRUD-Methoden zur Verfügung (save, findById, delete, usw.).
public interface UserRepository extends JpaRepository<User, Long> {
}
