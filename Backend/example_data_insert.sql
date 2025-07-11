-- Datenbank wählen
USE guestbook;

-- === User-Daten ===
INSERT INTO user (name, email, password) VALUES
  ('David', 'david@example.com', 'david123'),
  ('Eva', 'eva@example.com', 'evaSecure'),
  ('Felix', 'felix@example.com', 'f3lixPwd'),
  ('Gina', 'gina@example.com', 'gina1234'),
  ('Hannah', 'hannah@example.com', 'hanSecure!'),
  ('Ivan', 'ivan@example.com', 'iv@n456'),
  ('Julia', 'julia@example.com', 'j123!pass');

-- === Gästebucheinträge ===
INSERT INTO guestbook_entry (name, message) VALUES
  ('David', 'Mega Idee, ich bin begeistert!'),
  ('Eva', 'Sieht super aus, gutes Design.'),
  ('Felix', 'Sehr hilfreich für mein eigenes Projekt.'),
  ('Gina', 'Funktioniert einwandfrei, danke!'),
  ('Hannah', 'Spannende Umsetzung, gefällt mir.'),
  ('Ivan', 'Wird es auch ein Dark Mode geben?'),
  ('Julia', 'Coole App! Vielleicht noch Tags für Beiträge?');
