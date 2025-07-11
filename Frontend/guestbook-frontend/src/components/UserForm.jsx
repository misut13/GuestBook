import React from 'react'; // notwendig für JSX in Tests
import { useState } from 'react';

function UserForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.ok) {
          alert('Benutzer angelegt!');
          setForm({ name: '', email: '', password: '' });
        } else {
          alert('Fehler bei der Registrierung!');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={submit}>
      <input
        name="name"
        aria-label="Name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        aria-label="Email"
        value={form.email}
        onChange={handleChange}
        placeholder="E-Mail"
        required
      />
      <input
        name="password"
        type="password"
        aria-label="Passwort"
        value={form.password}
        onChange={handleChange}
        placeholder="Passwort"
        required
      />

      <button type="submit">Hinzufügen</button>
    </form>
  );
}

export default UserForm;
