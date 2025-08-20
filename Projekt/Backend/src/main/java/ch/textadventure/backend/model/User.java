package ch.textadventure.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Repräsentiert einen Benutzer im System.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name darf nicht leer sein")
    private String name;

    @Email(message = "Ungültige E-Mail-Adresse")
    @NotBlank(message = "E-Mail darf nicht leer sein")
    private String email;

    @NotBlank(message = "Passwort darf nicht leer sein")
    @Size(min = 6, message = "Passwort muss mindestens 6 Zeichen haben")
    private String password;

    /**
     * Standard-Konstruktor (Pflicht für JPA).
     */
    public User() {}

    /**
     * Konstruktor zum einfachen Erzeugen eines Benutzers.
     *
     * @param name     Benutzername
     * @param email    E-Mail-Adresse
     * @param password Passwort
     */
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    /**
     * Gibt die ID des Benutzers zurück.
     *
     * @return die ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setzt die ID des Benutzers.
     *
     * @param id die neue ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gibt den Namen des Benutzers zurück.
     *
     * @return der Name
     */
    public String getName() {
        return name;
    }

    /**
     * Setzt den Namen des Benutzers.
     *
     * @param name der neue Name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gibt die E-Mail-Adresse des Benutzers zurück.
     *
     * @return die E-Mail-Adresse
     */
    public String getEmail() {
        return email;
    }

    /**
     * Setzt die E-Mail-Adresse des Benutzers.
     *
     * @param email die neue E-Mail-Adresse
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gibt das Passwort des Benutzers zurück.
     *
     * @return das Passwort
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setzt das Passwort des Benutzers.
     *
     * @param password das neue Passwort
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
