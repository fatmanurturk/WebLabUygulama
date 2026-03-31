export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4"
    >
      <div className="text-center max-w-2xl">
        <p className="text-green-700 dark:text-green-400 font-medium mb-2">
          Merhaba, ben
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Fatmanur Türk
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Frontend Developer | React & TypeScript
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          >
            Projelerimi Gör
          </a>
          <a
            href="#contact"
            className="border border-green-700 text-green-700 dark:text-green-300 px-6 py-3 rounded-lg font-medium hover:bg-green-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </section>
  );
}

