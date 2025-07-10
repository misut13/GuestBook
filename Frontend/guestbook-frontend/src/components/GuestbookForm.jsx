import React from 'react'; // ✅ nötig für Babel / Jest / JSX
import { useState } from 'react';

function GuestbookForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = await fetch('http://localhost:8080/api/users/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .catch(() => false);

    if (!valid) {
      alert('Login-Daten falsch!');
      return;
    }

    fetch('http://localhost:8080/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Speichern");
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setName('');
        setMessage('');
        setEmail('');
        setPassword('');
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => {
        alert("Eintrag konnte nicht gespeichert werden.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Dein Benutzername"
        aria-label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Deine Nachricht"
        aria-label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Deine E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Dein Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Absenden</button>
      {success && <p style={{ marginTop: '1rem', color: '#6c63ff' }}>✅ Eintrag gespeichert!</p>}
    </form>
  );
}

export default GuestbookForm;
