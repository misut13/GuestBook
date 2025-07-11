/**
 * Zeigt eine Liste von Benutzern an.
 *
 * @param {{ users: Array<{ id: number, name: string }> }} props - Die Benutzerliste als Array
 * @returns {JSX.Element} Gerenderte Benutzerliste
 */
function UserList({ users }) {
  return (
    // Äußeres <ul> = Liste der Benutzer (unsortierte Liste)
    <ul className="user-list">
      {users.map((user) => (
        // Jeder Benutzer wird als <li> angezeigt – key ist wichtig für React
        <li key={user.id}>
          {/* Benutzername fett dargestellt */}
          <strong>{user.name}</strong>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
