import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GuestbookList from '../GuestbookList';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // liefert leere Einträge
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('zeigt "Keine Einträge vorhanden." wenn Liste leer ist', async () => {
  render(<GuestbookList />);

  // Warte darauf, dass "Keine Einträge vorhanden." erscheint
  await waitFor(() =>
    expect(screen.getByText(/keine einträge vorhanden/i)).toBeInTheDocument()
  );
});
