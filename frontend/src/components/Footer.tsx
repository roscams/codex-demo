import Link from 'next/link';

const footerLinks = {
  nieuws: [
    { name: 'Binnenland', href: '/binnenland' },
    { name: 'Buitenland', href: '/buitenland' },
    { name: 'Economie', href: '/economie' },
    { name: 'Politiek', href: '/politiek' },
  ],
  sport: [
    { name: 'Voetbal', href: '/sport/voetbal' },
    { name: 'Wielrennen', href: '/sport/wielrennen' },
    { name: 'Tennis', href: '/sport/tennis' },
    { name: 'F1', href: '/sport/f1' },
  ],
  entertainment: [
    { name: 'Showbizz', href: '/showbizz' },
    { name: 'TV', href: '/tv' },
    { name: 'Film', href: '/film' },
    { name: 'Muziek', href: '/muziek' },
  ],
  overig: [
    { name: 'Over ons', href: '/over-ons' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Algemene voorwaarden', href: '/voorwaarden' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-hln-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Nieuws</h3>
            <ul className="space-y-2">
              {footerLinks.nieuws.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Sport</h3>
            <ul className="space-y-2">
              {footerLinks.sport.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Entertainment</h3>
            <ul className="space-y-2">
              {footerLinks.entertainment.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Over HLN</h3>
            <ul className="space-y-2">
              {footerLinks.overig.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-hln-red">HLN</span>
              <span className="text-gray-400">Het Laatste Nieuws</span>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HLN. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
