import { useEffect, useState } from 'react';

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
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Users;
