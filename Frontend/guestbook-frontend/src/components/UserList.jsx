/**
 * Zeigt eine Liste von Benutzern an.
 * @param {{ users: Array<{ id: number, name: string }> }} props
 */
function UserList({ users }) {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
