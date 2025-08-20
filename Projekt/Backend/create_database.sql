-- Datenbank erstellen, falls sie nicht existiert
CREATE DATABASE IF NOT EXISTS guestbook;

-- Datenbank auswählen
USE guestbook;

-- Datenbank-Benutzer anlegen (kann fehlschlagen, wenn Benutzer schon existiert)
CREATE USER 'GuestbookUser'@'localhost' IDENTIFIED BY 'Test.123';

-- Rechte auf die guestbook-Datenbank geben
GRANT ALL PRIVILEGES ON guestbook.* TO 'GuestbookUser'@'localhost';
