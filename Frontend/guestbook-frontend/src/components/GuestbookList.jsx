import React, { useEffect, useState } from 'react';

/**
 * Zeigt eine Liste aller Gästebucheinträge.
 *
 * Die Komponente lädt beim ersten Rendern automatisch alle Einträge
 * und erlaubt das Löschen und Bearbeiten einzelner Nachrichten.
 *
 * @component
 * @returns {JSX.Element} Die Gästebucheintragsliste
 *
 * @example
 * return <GuestbookList />
 */
function GuestbookList() {
  const [entries, setEntries] = useState([]);           // Liste aller Einträge
  const [loading, setLoading] = useState(true);         // Ladespinner-Zustand
  const [editingId, setEditingId] = useState(null);     // ID des gerade bearbeiteten Eintrags
  const [editMessage, setEditMessage] = useState('');   // Zwischenpuffer für neue Nachricht

  // Lädt beim ersten Rendern alle Gästebucheinträge
  useEffect(() => {
    fetch('http://localhost:8080/api/guestbook')
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fehler beim Laden:', err);
        setLoading(false);
      });
  }, []); // leeres Dependency-Array → nur 1x ausführen beim Laden

  // Löscht einen Eintrag nach Bestätigung
  const deleteEntry = (id) => {
    const confirmDelete = window.confirm("Eintrag wirklich löschen?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/guestbook/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) throw new Error("Löschen fehlgeschlagen");
        // Lösche Eintrag aus dem State
        setEntries(entries.filter((e) => e.id !== id));
      })
      .catch((err) => {
        console.error("Fehler beim Löschen:", err);
        alert("Eintrag konnte nicht gelöscht werden.");
      });
  };

  // Startet den Bearbeitungsmodus für einen bestimmten Eintrag
  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditMessage(entry.message);
  };

  // Bricht die Bearbeitung ab
  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage('');
  };

  // Speichert die bearbeitete Nachricht
  const saveEdit = (id) => {
    const entry = entries.find((e) => e.id === id);
    const updatedEntry = { ...entry, message: editMessage };

    fetch(`http://localhost:8080/api/guestbook/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEntry)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Bearbeiten fehlgeschlagen");
        return res.json();
      })
      .then((data) => {
        // Ersetze den bearbeiteten Eintrag im State
        setEntries(entries.map((e) => (e.id === id ? data : e)));
        cancelEdit(); // Bearbeitungsmodus beenden
      })
      .catch((err) => {
        console.error("Fehler beim Bearbeiten:", err);
        alert("Eintrag konnte nicht bearbeitet werden.");
      });
  };

  // Lade- oder Leere-Zustände
  if (loading) return <p>Lade Einträge...</p>;
  if (entries.length === 0) return <p>Keine Einträge vorhanden.</p>;

  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <strong>{entry.name}</strong>

          {editingId === entry.id ? ( // Wenn dieser Eintrag gerade bearbeitet wird
            <>
              {/* Eingabefeld für die neue Nachricht */}
              <textarea
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              {/* Buttons für Bearbeitungsmodus */}
              <div style={{ marginTop: '8px' }}>
                <button onClick={() => saveEdit(entry.id)}>Speichern</button>      {/* Speichern klick */}
                <button onClick={cancelEdit} style={{ marginLeft: '8px' }}>Abbrechen</button> {/* Bearbeitung abbrechen */}
              </div>
            </>
          ) : ( // Sonst: normale Anzeige
            <>
              <p>{entry.message}</p> {/* Nachricht anzeigen */}
              {/* Aktionsbuttons für Löschen / Bearbeiten */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => deleteEntry(entry.id)}>Löschen</button>
                <button onClick={() => startEdit(entry)}>Bearbeiten</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default GuestbookList;
