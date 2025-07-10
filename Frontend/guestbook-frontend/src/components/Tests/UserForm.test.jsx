import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';

// MOCK für fetch vorbereiten
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('führt fetch aus beim Submit', async () => {
  render(<UserForm />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Max' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'max@example.com' } });
  fireEvent.change(screen.getByLabelText(/passwort/i), { target: { value: '1234' } });

  fireEvent.click(screen.getByRole('button', { name: /hinzufügen/i }));

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:8080/api/users',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Max',
        email: 'max@example.com',
        password: '1234',
      }),
    })
  );
});
