-- Datenbank wählen
USE guestbook;

-- === User-Daten ===
INSERT INTO user (name, email, password) VALUES
  ('Anna', 'anna@example.com', 'pass123'),
  ('Ben', 'ben@example.com', 'secret456'),
  ('Clara', 'clara@example.com', 'geheim789');

-- === Gästebucheinträge ===
INSERT INTO guestbook_entry (name, message) VALUES
  ('Anna', 'Tolle Seite! Danke für die Arbeit.'),
  ('Ben', 'Ich freue mich auf mehr Features!'),
  ('Clara', 'Sehr cooles Projekt, weiter so!');
