package ch.textadventure.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Repräsentiert einen Eintrag im Gästebuch.
 */
@Entity
public class GuestbookEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name darf nicht leer sein")
    @Size(max = 100, message = "Name darf maximal 100 Zeichen lang sein")
    private String name;

    @NotBlank(message = "Nachricht darf nicht leer sein")
    @Size(max = 500, message = "Nachricht darf maximal 500 Zeichen lang sein")
    private String message;

    /**
     * Standard-Konstruktor (wird von JPA benötigt).
     */
    public GuestbookEntry() {
    }

    /**
     * Konstruktor zum einfachen Erzeugen eines Gästebuch-Eintrags.
     *
     * @param name    Name des Autors
     * @param message Nachricht im Gästebuch
     */
    public GuestbookEntry(String name, String message) {
        this.name = name;
        this.message = message;
    }

    /**
     * Gibt die ID des Eintrags zurück.
     *
     * @return die ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setzt die ID des Eintrags.
     *
     * @param id die neue ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gibt den Namen des Autors zurück.
     *
     * @return der Name
     */
    public String getName() {
        return name;
    }

    /**
     * Setzt den Namen des Autors.
     *
     * @param name der Name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gibt die Nachricht des Eintrags zurück.
     *
     * @return die Nachricht
     */
    public String getMessage() {
        return message;
    }

    /**
     * Setzt die Nachricht des Eintrags.
     *
     * @param message die neue Nachricht
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
