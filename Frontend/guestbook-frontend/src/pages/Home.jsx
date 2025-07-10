import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Willkommen beim Gästebuch-Projekt!</h1>

      <Link to="/guestbook" className="card link-card">
        <h3>Gästebuch ansehen</h3>
      </Link>

      <Link to="/new" className="card link-card">
        <h3>Neuen Eintrag schreiben</h3>
      </Link>

      <Link to="/register" className="card link-card">
        <h3>Registrieren</h3>
      </Link>
    </>
  );
}

export default Home;
