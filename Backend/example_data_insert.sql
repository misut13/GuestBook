-- Datenbank auswählen
use guestbook;

-- Weitere User-Daten
INSERT INTO user (name, email, password) VALUES
  ('Kevin', 'kevin@example.com', 'kevin321'),
  ('Laura', 'laura@example.com', 'lauPass!'),
  ('Marc', 'marc@example.com', 'marc2024'),
  ('Nina', 'nina@example.com', 'n!naPwd'),
  ('Oliver', 'oliver@example.com', 'oliv3rPwd'),
  ('Petra', 'petra@example.com', 'petra789'),
  ('Quentin', 'quentin@example.com', 'qSecure123'),
  ('Rita', 'rita@example.com', 'r!t@pass'),
  ('Samuel', 'samuel@example.com', 's@m321'),
  ('Tina', 'tina@example.com', 't1naRulez');

-- Weitere Gästebucheinträge
INSERT INTO guestbook_entry (name, message) VALUES
  ('Kevin', 'Ich finde die Ladezeiten super!'),
  ('Laura', 'Kann man auch Bilder einfügen?'),
  ('Marc', 'Sehr intuitiv zu bedienen.'),
  ('Nina', 'Wann kommt die Mobile-Version?'),
  ('Oliver', 'Wäre cool mit Login-Funktion.'),
  ('Petra', 'Die Idee ist echt klasse!'),
  ('Quentin', 'Ich hätte gerne eine Kommentarfunktion.'),
  ('Rita', 'Die Performance ist top!'),
  ('Samuel', 'Könnte man das Design noch anpassen?'),
  ('Tina', 'Danke für dieses tolle Tool!');
