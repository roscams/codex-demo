import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-hln-red mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Pagina niet gevonden</h2>
      <p className="text-gray-600 mb-8">
        De pagina die je zoekt bestaat niet of is verplaatst.
      </p>
      <Link
        href="/"
        className="inline-block bg-hln-red text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        Terug naar home
      </Link>
    </div>
  );
}
