import React from 'react';


import { useEffect, useState } from 'react';

function GuestbookList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Lade Einträge...</p>;
  if (entries.length === 0) return <p>Keine Einträge vorhanden.</p>;

  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <strong>{entry.name}</strong>
          <p>{entry.message}</p>
          <button onClick={() => deleteEntry(entry.id)}>Löschen</button>
        </li>
      ))}
    </ul>
  );
}

export default GuestbookList;
