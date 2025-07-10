import React, { useEffect, useState } from 'react';

function GuestbookList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

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
  }, []);

  const deleteEntry = (id) => {
    const confirmDelete = window.confirm("Eintrag wirklich löschen?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/guestbook/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) throw new Error("Löschen fehlgeschlagen");
        setEntries(entries.filter((e) => e.id !== id));
      })
      .catch((err) => {
        console.error("Fehler beim Löschen:", err);
        alert("Eintrag konnte nicht gelöscht werden.");
      });
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditMessage(entry.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage('');
  };

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
        setEntries(entries.map((e) => (e.id === id ? data : e)));
        cancelEdit();
      })
      .catch((err) => {
        console.error("Fehler beim Bearbeiten:", err);
        alert("Eintrag konnte nicht bearbeitet werden.");
      });
  };

  if (loading) return <p>Lade Einträge...</p>;
  if (entries.length === 0) return <p>Keine Einträge vorhanden.</p>;

  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <strong>{entry.name}</strong>
          {editingId === entry.id ? (
            <>
              <textarea
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              <div style={{ marginTop: '8px' }}>
                <button onClick={() => saveEdit(entry.id)}>Speichern</button>
                <button onClick={cancelEdit} style={{ marginLeft: '8px' }}>Abbrechen</button>
              </div>
            </>
          ) : (
            <>
              <p>{entry.message}</p>
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
