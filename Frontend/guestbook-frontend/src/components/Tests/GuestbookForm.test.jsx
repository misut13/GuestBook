import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GuestbookForm from '../GuestbookForm';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/verify')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(true),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('führt Login- und Guestbook-Fetch beim Submit aus', async () => {
  render(<GuestbookForm />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Max' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hallo Welt' } });
  fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: 'max@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/passwort/i), { target: { value: '1234' } });

  fireEvent.click(screen.getByRole('button', { name: /absenden/i }));

  // ⏳ warte auf alle Updates nach dem Submit
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
