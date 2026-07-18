import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section notFound">
      <h1 className="notFoundTitle">404</h1>
      <p className="notFoundText">Oups... Cette page est introuvable.</p>
      <Link className="buttonPrimary" href="/">
        Retour à l'accueil
      </Link>
    </main>
  );
}
