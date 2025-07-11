import UserForm from '../components/UserForm';

/**
 * Registrierungsseite für neue Benutzer.
 *
 * Diese Komponente zeigt:
 * - eine Überschrift
 * - einen Hinweis zur Passwortlänge
 * - das <UserForm /> zur Eingabe von Name, E-Mail und Passwort.
 *
 * Wird unter der Route `/register` angezeigt.
 *
 * @component
 * @returns {JSX.Element} Die gerenderte Registrierungsseite
 *
 * @example
 * return <RegisterUser />
 */
function RegisterUser() {
  return (
    <div className="container">
      <h1>Konto erstellen</h1>
      <p>Das Passwort muss mindestens 6 Zeichen lang sein!</p>
      <UserForm />
    </div>
  );
}

export default RegisterUser;
