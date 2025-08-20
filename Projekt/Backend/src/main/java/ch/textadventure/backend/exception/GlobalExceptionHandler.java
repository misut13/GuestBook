package ch.textadventure.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Fehlerbehandlung für REST-Controller.
 * Fängt Validierungsfehler ab und gibt verständliche JSON-Antworten zurück.
 */
@RestControllerAdvice  // Macht diese Klasse zum globalen Exception-Handler für alle Controller
public class GlobalExceptionHandler {

    /**
     * Behandelt Fehler, wenn ein Objekt mit @Valid ungültige Daten enthält.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)  // Wird bei Validierungsfehlern automatisch aufgerufen
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();  // Speichert alle Fehler als Feldname Fehlermeldung

        // Für jedes fehlerhafte Feld: Name und Fehlermeldung zur Map hinzufügen
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        // JSON-Antwort mit Fehlern und HTTP 400 zurückgeben
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
