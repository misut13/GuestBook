import React, { useState } from 'react';

function GuestbookForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Login-Verifizierung
      const verifyRes = await fetch('http://localhost:8080/api/users/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!verifyRes.ok) {
        alert('Login-Daten falsch!');
        setLoading(false);
        return;
      }

      const isValid = await verifyRes.json();
      if (!isValid) {
        alert('Verifizierung fehlgeschlagen!');
        setLoading(false);
        return;
      }

      // 2. Gästebucheintrag absenden
      const entryRes = await fetch('http://localhost:8080/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });

      if (!entryRes.ok) {
        const errorText = await entryRes.text();
        throw new Error(`Fehler beim Speichern:\n${errorText}`);
      }

      // Erfolgreich gespeichert
      setSuccess(true);
      setName('');
      setMessage('');
      setEmail('');
      setPassword('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Eintrag konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
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
      <button type="submit" disabled={loading}>
        {loading ? 'Bitte warten...' : 'Absenden'}
      </button>
      {success && <p style={{ marginTop: '1rem', color: '#6c63ff' }}>Eintrag gespeichert!</p>}
    </form>
  );
}

export default GuestbookForm;
