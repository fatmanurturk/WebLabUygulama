import profilGorsel from '../../assets/profil.svg';

export default function About() {
  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <figure className="shrink-0">
          <img
            src={profilGorsel}
            alt="Fatmanur Türk'ün profil görseli (örnek)"
            className="w-40 h-40 rounded-full object-cover shadow-lg"
          />
        </figure>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left">
            Hakkımda
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Merhaba! Ben Fatmanur Türk. Web arayüzleri geliştirirken semantik HTML ve
            erişilebilirliği (a11y) temel kalite kriteri olarak görüyorum.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Bu sayfa React + TypeScript + Tailwind ile component tabanlı bir portföy
            uygulamasıdır.
          </p>
        </div>
      </div>
    </section>
  );
}

