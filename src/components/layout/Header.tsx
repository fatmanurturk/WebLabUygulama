import { useState } from 'react';

const navLinks = [
  { href: '#hero', label: 'Ana Sayfa' },
  { href: '#about', label: 'Hakkımda' },
  { href: '#projects', label: 'Projeler' },
  { href: '#contact', label: 'İletişim' },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="text-xl font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        >
          Portföy
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6" aria-label="Ana navigasyon">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobil menu butonu */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          aria-label="Menu"
          aria-expanded={menuOpen}
          type="button"
        >
          <span className="block w-6 h-0.5 bg-gray-700 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-700 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-700" />
        </button>
      </nav>

      {menuOpen ? (
        <ul className="md:hidden border-t border-gray-200 bg-white dark:bg-gray-900 px-4 pb-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}

