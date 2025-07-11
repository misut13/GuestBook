import React from 'react';
import GuestbookList from '../components/GuestbookList';

/**
 * Zeigt die Gästebucheinträge im Gästebuch-Bereich an.
 *
 * Diese Komponente dient als Seite (Route) und enthält:
 * - einen Titel
 * - eine visuelle Karte mit der <GuestbookList />-Komponente, die Einträge rendert.
 *
 * @component
 * @returns {JSX.Element} Die gerenderte Gästebuch-Seite
 *
 * @example
 * return <Guestbook />
 */
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
