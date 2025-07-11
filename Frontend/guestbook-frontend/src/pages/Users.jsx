import { useEffect, useState } from 'react';
import UserList from '../components/UserList';

/**
 * Seite zur Anzeige aller Benutzer.
 *
 * Diese Komponente lädt beim ersten Rendern automatisch alle Benutzer
 * vom Backend und zeigt sie mit <UserList /> an.
 * Zeigt Ladezustand oder eine Leermeldung, falls keine Benutzer vorhanden sind.
 *
 * @component
 * @returns {JSX.Element} Die Benutzer-Übersichtsseite
 *
 * @example
 * return <Users />
 */
function Users() {
  const [users, setUsers] = useState([]);         // Zustand für die Benutzerliste
  const [loading, setLoading] = useState(true);   // Zustand für Ladeanzeige

  /**
   * useEffect wird direkt nach dem ersten Rendern ausgeführt.
   * Es wird eine GET-Anfrage an das Backend gesendet, um die Benutzer zu laden.
   */
  useEffect(() => {
    fetch('http://localhost:8080/api/users')           // API-Aufruf an Spring-Backend
      .then((res) => res.json())                       // Antwort in JSON umwandeln
      .then((data) => {
        setUsers(data);                                // Benutzer speichern
        setLoading(false);                             // Ladeanzeige deaktivieren
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Benutzer:", err);
        setLoading(false);                             // auch bei Fehlern: Ladeanzeige aus
      });
  }, []); // leeres Array nur einmal beim Laden der Seite ausführen

  return (
    <div className="container">
      <h1>Alle Benutzer</h1>

      <div className="card">
        {loading ? ( // Wenn Daten noch geladen werden
          <p>Lade Benutzer...</p>
        ) : users.length === 0 ? ( // Wenn keine Benutzer im Array sind
          <p>Keine Benutzer gefunden.</p>
        ) : ( // Wenn Benutzer vorhanden → an Komponente übergeben
          <UserList users={users} />
        )}
      </div>
    </div>
  );
}

export default Users;
