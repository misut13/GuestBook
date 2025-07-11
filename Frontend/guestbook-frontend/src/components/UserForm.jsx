import React from 'react'; // notwendig für JSX (z. B. Tests mit Jest)
import { useState } from 'react';

/**
 * Formular zur Registrierung eines neuen Benutzers.
 *
 * Die Komponente sendet Name, E-Mail und Passwort an das Backend
 * und zeigt eine Rückmeldung bei Erfolg oder Fehler.
 *
 * @component
 * @returns {JSX.Element} Das Registrierungsformular
 *
 * @example
 * return <UserForm />
 */
function UserForm() {
  // State für alle Formularfelder gemeinsam in einem Objekt
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  /**
   * Reagiert auf Änderungen in den Eingabefeldern.
   * Aktualisiert den entsprechenden Wert im State (z. B. name/email/password)
   */
  const handleChange = (e) => {
    setForm({
      ...form,                        // bestehende Werte behalten
      [e.target.name]: e.target.value // das eine Feld aktualisieren (dynamisch per Name)
    });
  };

  /**
   * Wird beim Absenden des Formulars ausgeführt.
   * Sendet die eingegebenen Benutzerdaten ans Backend.
   */
  const submit = (e) => {
    e.preventDefault(); // verhindert Seitenreload

    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form) // sendet name, email, password
    })
      .then(res => {
        if (res.ok) {
          alert('Benutzer angelegt!');
          // Formular nach erfolgreichem Absenden zurücksetzen
          setForm({ name: '', email: '', password: '' });
        } else {
          alert('Fehler bei der Registrierung!');
        }
      })
      .catch(err => console.error(err)); // Netzfehler oder Serverfehler
  };

  return (
    <form onSubmit={submit}>
      <input
        name="name"                            // verwendet für setForm
        aria-label="Name"
        value={form.name}
        onChange={handleChange}                // aktualisiert form.name
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        aria-label="Email"
        value={form.email}
        onChange={handleChange}                // aktualisiert form.email
        placeholder="E-Mail"
        required
      />
      <input
        name="password"
        type="password"
        aria-label="Passwort"
        value={form.password}
        onChange={handleChange}                // aktualisiert form.password
        placeholder="Passwort"
        required
      />

      <button type="submit">Hinzufügen</button> {/* sendet Formular ab */}
    </form>
  );
}

export default UserForm;
