import React from 'react';
import { render, screen } from '@testing-library/react';
import Guestbook from '../../pages/Guestbook';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, name: 'Anna', message: 'Hallo' },
        { id: 2, name: 'Lukas', message: 'Tschüss' },
      ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('zeigt Guestbook-Einträge an', async () => {
  render(<Guestbook />);

  expect(await screen.findByText('Anna')).toBeInTheDocument();
  expect(await screen.findByText('Tschüss')).toBeInTheDocument();
});
