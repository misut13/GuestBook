// src/components/Tests/UserList.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from '../UserList';

test('zeigt Benutzernamen an', () => {
  const users = [
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Lukas' }
  ];
  
  render(<UserList users={users} />);
  
  expect(screen.getByText('Anna')).toBeInTheDocument();
  expect(screen.getByText('Lukas')).toBeInTheDocument();
});
