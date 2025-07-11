import { useEffect, useState } from 'react';
import UserList from '../components/UserList';

/**
 * Seite zur Anzeige aller Benutzer.
 */
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Benutzer:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Alle Benutzer</h1>
      <div className="card">
        {loading ? (
          <p>Lade Benutzer...</p>
        ) : users.length === 0 ? (
          <p>Keine Benutzer gefunden.</p>
        ) : (
          <UserList users={users} />
        )}
      </div>
    </div>
  );
}

export default Users;
