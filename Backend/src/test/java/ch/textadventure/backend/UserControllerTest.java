package ch.textadventure.backend;

import ch.textadventure.backend.controller.UserController;
import ch.textadventure.backend.model.User;
import ch.textadventure.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    private UserRepository userRepository;
    private UserController userController;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        userController = new UserController(userRepository);
    }

    @Test
    void testGetAllUsers() {
        User user1 = new User();
        user1.setName("Anna");

        User user2 = new User();
        user2.setName("Lukas");

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        List<User> users = userController.getAllUsers();

        assertEquals(2, users.size());
        assertEquals("Anna", users.get(0).getName());
        assertEquals("Lukas", users.get(1).getName());
    }

    @Test
    void testSaveUserViaRepository() {
        User user = new User();
        user.setName("Testuser");

        when(userRepository.save(any(User.class))).thenReturn(user);

        User saved = userRepository.save(user);

        assertNotNull(saved);
        assertEquals("Testuser", saved.getName());
    }

}
