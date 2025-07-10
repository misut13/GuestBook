import React from 'react';
import GuestbookList from '../components/GuestbookList';

function Guestbook() {
  return (
    <>
      <h1>Gästebucheinträge</h1>
      <div className="card">
        <GuestbookList />
      </div>
    </>
  );
}

export default Guestbook;
