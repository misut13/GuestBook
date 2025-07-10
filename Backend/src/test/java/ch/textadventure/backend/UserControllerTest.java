package ch.textadventure.backend;

import ch.textadventure.backend.controller.UserController;
import ch.textadventure.backend.model.User;
import ch.textadventure.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Testklasse für den UserController.
 */
public class UserControllerTest {

    private UserRepository userRepository;
    private UserController userController;

    /**
     * Vor jedem Test: Mock des Repositories erstellen
     * und Controller mit diesem Mock initialisieren.
     */
    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        userController = new UserController(userRepository);
    }

    /**
     * Testet, ob alle Benutzer korrekt zurückgegeben werden.
     */
    @Test
    void testGetAllUsers_ReturnsCorrectList() {
        User user1 = new User("Anna", "anna@example.com", "pass1");
        User user2 = new User("Lukas", "lukas@example.com", "pass2");

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        List<User> result = userController.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("Anna", result.get(0).getName());
        assertEquals("Lukas", result.get(1).getName());
    }

    /**
     * Testet, ob ein neuer Benutzer korrekt gespeichert wird.
     */
    @Test
    void testCreateUser_SavesAndReturnsUser() {
        User user = new User("Test", "test@example.com", "123456");

        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userController.createUser(user);

        assertNotNull(result);
        assertEquals("Test", result.getName());
    }

    /**
     * Testet erfolgreiche Benutzerverifikation (korrekte Daten).
     */
    @Test
    void testVerifyUser_SuccessfulMatch() {
        User existing = new User("Nina", "nina@mail.com", "secure");
        when(userRepository.findAll()).thenReturn(List.of(existing));

        User input = new User("Nina", "nina@mail.com", "secure");
        boolean result = userController.verifyUser(input);

        assertTrue(result);
    }

    /**
     * Testet fehlgeschlagene Verifikation (falsches Passwort).
     */
    @Test
    void testVerifyUser_WrongPassword() {
        User existing = new User("Nina", "nina@mail.com", "secure");
        when(userRepository.findAll()).thenReturn(List.of(existing));

        User input = new User("Nina", "nina@mail.com", "wrongpass");
        boolean result = userController.verifyUser(input);

        assertFalse(result);
    }

    /**
     * Testet Verhalten, wenn keine Benutzer vorhanden sind.
     */
    @Test
    void testGetAllUsers_EmptyList() {
        when(userRepository.findAll()).thenReturn(List.of());

        List<User> result = userController.getAllUsers();

        assertTrue(result.isEmpty());
    }
}
