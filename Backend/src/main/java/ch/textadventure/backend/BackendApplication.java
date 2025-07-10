package ch.textadventure.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Hauptklasse für das Spring Boot Backend der Gästebuch-Applikation.
 *
 * Diese Klasse startet die gesamte Anwendung und initialisiert
 * den eingebetteten Webserver sowie die Konfigurationen.
 */
@SpringBootApplication
public class BackendApplication {

    /**
     * Einstiegspunkt der Spring Boot Anwendung.
     *
     * @param args Kommandozeilenargumente (nicht verwendet)
     */
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
