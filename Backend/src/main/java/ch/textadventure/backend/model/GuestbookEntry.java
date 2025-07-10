package ch.textadventure.backend.model;

public class GuestbookEntry {
    private String name;
    private String message;

    // Getter
    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }

    // Setter
    public void setName(String name) {
        this.name = name;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
