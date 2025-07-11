import GuestbookForm from '../components/GuestbookForm';

/**
 * Seite zum Verfassen eines neuen Gästebucheintrags.
 *
 * Diese Komponente zeigt:
 * - eine Überschrift
 * - das Formular <GuestbookForm />, mit dem Benutzer einen neuen Eintrag erstellen können.
 *
 * Wird unter der Route `/new` angezeigt.
 *
 * @component
 * @returns {JSX.Element} Die gerenderte Eingabeseite für einen neuen Eintrag
 *
 * @example
 * return <NewEntry />
 */
function NewEntry() {
  return (
    <div className="container">
      <h1>Neuen Eintrag verfassen</h1>
      <GuestbookForm />
    </div>
  );
}

export default NewEntry;
