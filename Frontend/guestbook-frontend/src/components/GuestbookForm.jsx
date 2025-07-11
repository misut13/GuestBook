import React, { useState } from 'react';

/**
 * Formular zum Verfassen eines neuen Gästebucheintrags.
 *
 * Vor dem Speichern wird überprüft, ob Benutzername, E-Mail und Passwort gültig sind.
 * Erst nach erfolgreicher Verifizierung wird die Nachricht gespeichert.
 *
 * @component
 * @returns {JSX.Element} Das Eingabeformular für das Gästebuch
 *
 * @example
 * return <GuestbookForm />
 */
function GuestbookForm() {
  // Formularfelder
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Statusanzeigen
  const [success, setSuccess] = useState(false);   // Zeigt Erfolgsnachricht
  const [loading, setLoading] = useState(false);   // Button blockieren während Request läuft

  /**
   * Wird beim Absenden des Formulars ausgelöst.
   * Zuerst wird der User verifiziert, dann wird der Eintrag gespeichert.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();       // Verhindert Standard-Seitenreload
    setLoading(true);         // Deaktiviert den Submit-Button

    try {
      // 1. Verifizierung des Benutzers
      const verifyRes = await fetch('http://localhost:8080/api/users/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      // Wenn Login fehlgeschlagen (HTTP-Fehler)
      if (!verifyRes.ok) {
        alert('Login-Daten falsch!');
        setLoading(false);
        return;
      }

      // Wenn Login technisch ok, aber Daten ungültig (false im Body)
      const isValid = await verifyRes.json();
      if (!isValid) {
        alert('Verifizierung fehlgeschlagen!');
        setLoading(false);
        return;
      }

      // 2. Eintrag speichern
      const entryRes = await fetch('http://localhost:8080/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }) // Nur Name & Nachricht werden gespeichert
      });

      // Fehlerhafte Antwort abfangen
      if (!entryRes.ok) {
        const errorText = await entryRes.text();
        throw new Error(`Fehler beim Speichern:\n${errorText}`);
      }

      // 3. Erfolgsverhalten
      setSuccess(true);       // Erfolgsmeldung anzeigen
      setName('');
      setMessage('');
      setEmail('');
      setPassword('');

      // Erfolgsmeldung nach 3 Sekunden automatisch ausblenden
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error(err);
      alert(err.message || 'Eintrag konnte nicht gespeichert werden.');
    } finally {
      setLoading(false); // Button wieder freigeben
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Dein Benutzername"
        aria-label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Eingabe zwischenspeichern
        required
      />
      <textarea
        placeholder="Deine Nachricht"
        aria-label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Nachricht zwischenspeichern
        required
      />
      <input
        type="email"
        placeholder="Deine E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // E-Mail zwischenspeichern
        required
      />
      <input
        type="password"
        placeholder="Dein Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Passwort zwischenspeichern
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Bitte warten...' : 'Absenden'} {/* Buttontext dynamisch */}
      </button>

      {/* Erfolgsmeldung (wird nach erfolgreichem Speichern angezeigt) */}
      {success && (
        <p style={{ marginTop: '1rem', color: '#6c63ff' }}>
          Eintrag gespeichert!
        </p>
      )}
    </form>
  );
}

export default GuestbookForm;
