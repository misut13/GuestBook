import { Link } from 'react-router-dom';

/**
 * Navigationsleiste für die Anwendung.
 *
 * Zeigt Links zu den Hauptseiten:
 * - Start
 * - Gästebuch
 * - Neuer Eintrag
 * - Registrierung
 * - Benutzerliste
 *
 * @component
 * @returns {JSX.Element} Die Navigationsleiste
 */
function Header() {
  return (
    <nav>
      <Link to="/">Start</Link>
      <Link to="/guestbook">Gästebuch</Link>
      <Link to="/new">Neuer Eintrag</Link>
      <Link to="/register">Benutzer registrieren</Link>
      <Link to="/users">Benutzer anzeigen</Link>
    </nav>
  );
}

export default Header;
