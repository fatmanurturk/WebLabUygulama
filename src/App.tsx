import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import profilGorsel from './assets/profil.svg';
import proje1Gorsel from './assets/proje-1.svg';
import proje2Gorsel from './assets/proje-2.svg';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import UIKit from './pages/UIKit';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const next: FormErrors = {};

  const name = values.name.trim();
  if (!name) next.name = 'Ad Soyad alanı zorunludur.';
  else if (name.length < 2) next.name = 'Ad Soyad en az 2 karakter olmalıdır.';

  const email = values.email.trim();
  if (!email) next.email = 'E-posta alanı zorunludur.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    next.email = 'Geçerli bir e-posta adresi giriniz.';

  if (!values.subject) next.subject = 'Lütfen bir konu seçiniz.';

  const message = values.message.trim();
  if (!message) next.message = 'Mesaj alanı zorunludur.';
  else if (message.length < 10) next.message = 'Mesaj en az 10 karakter olmalıdır.';

  return next;
}

function App() {
  const [page, setPage] = useState<'portfolio' | 'uikit'>('portfolio');
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedOk, setSubmittedOk] = useState(false);

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  function onChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setSubmittedOk(false);

    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmittedOk(true);
      setValues({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmittedOk(false);
    }
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  if (page === 'uikit') {
    return (
      <>
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Tema değiştir"
          type="button"
        >
          <span className="dark:hidden">&#9790;</span>
          <span className="hidden dark:inline">&#9728;</span>
        </button>

        <div className="fixed top-4 left-4 z-50">
          <Button variant="ghost" onClick={() => setPage('portfolio')}>
            ← Portföy
          </Button>
        </div>

        <UIKit />
      </>
    );
  }

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Tema değiştir"
        type="button"
      >
        <span className="dark:hidden">&#9790;</span>
        <span className="hidden dark:inline">&#9728;</span>
      </button>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-green-800 text-white p-2 z-50"
      >
        Ana içeriğe atla
      </a>

      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-green-800 dark:text-green-300">
              Fatmanur Türk
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Yazılım Mühendisliği • Kişisel Portföy
            </p>
          </div>

          <nav aria-label="Ana navigasyon">
            <ul className="flex flex-wrap gap-2 items-center">
              <li>
                <a
                  href="#hakkimda"
                  className="px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Hakkımda
                </a>
              </li>
              <li>
                <a
                  href="#projeler"
                  className="px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Projeler
                </a>
              </li>
              <li>
                <a
                  href="#iletisim"
                  className="px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-800 transition-colors"
                >
                  İletişim
                </a>
              </li>
              <li>
                <Button variant="secondary" size="sm" onClick={() => setPage('uikit')}>
                  UI Kit
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="hakkimda" className="py-16 px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
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
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Merhaba! Ben Fatmanur Türk. Web arayüzleri geliştirirken semantik HTML ve
                erişilebilirliği (a11y) temel kalite kriteri olarak görüyorum.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Bu sayfa LAB-4 kapsamında Tailwind CSS, component yaklaşımı ve dark mode
                pratik etmek için hazırlanmıştır.
              </p>

              <ul className="flex flex-wrap gap-2" role="list" aria-label="Beceri etiketleri">
                {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind'].map(
                  (t) => (
                    <li
                      key={t}
                      className="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>

        <section id="projeler" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
              Projelerim
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                variant="elevated"
                title="Görev Takip Uygulaması"
                image={proje1Gorsel}
                imageAlt="Görev takip uygulaması arayüzü ekran görüntüsü (örnek)"
              >
                React ve TypeScript ile basit bir todo akışı. Kalıcı saklama denemeleri.
              </Card>
              <Card
                variant="outlined"
                title="Kişisel Blog Şablonu"
                image={proje2Gorsel}
                imageAlt="Kişisel blog sayfası arayüzü ekran görüntüsü (örnek)"
                footer={<Button size="sm">Detay</Button>}
              >
                Okunabilirlik ve erişilebilirlik odaklı tek sayfa blog şablonu.
              </Card>
              <Card variant="filled" title="Yeni Proje (Yakında)">
                Bu alanı kendi projenle güncelleyebilirsin.
              </Card>
            </div>
          </div>
        </section>

        <section id="iletisim" className="py-16 px-4">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              İletişim
            </h2>

            <form className="space-y-4" noValidate onSubmit={onSubmit}>
              <Input
                id="name"
                name="name"
                label="Ad Soyad"
                required
                minLength={2}
                value={values.name}
                onChange={onChange}
                error={errors.name}
              />

              <Input
                id="email"
                name="email"
                label="E-posta"
                type="email"
                required
                value={values.email}
                onChange={onChange}
                error={errors.email}
                helpText="Örnek: ad@mail.com"
              />

              <div className="space-y-1">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Konu
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={values.subject}
                  onChange={onChange}
                  aria-describedby="subject-error"
                  aria-invalid={Boolean(errors.subject)}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 dark:text-gray-100 ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-600 dark:border-gray-600'
                  } bg-white dark:bg-gray-800`}
                >
                  <option value="">-- Seçiniz --</option>
                  <option value="is">İş Teklifi</option>
                  <option value="soru">Soru</option>
                  <option value="oneri">Öneri</option>
                </select>
                <p
                  id="subject-error"
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400 min-h-[1.25rem]"
                >
                  {errors.subject ?? ''}
                </p>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  value={values.message}
                  onChange={onChange}
                  aria-describedby="message-error"
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 dark:text-gray-100 ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-600 dark:border-gray-600'
                  } bg-white dark:bg-gray-800`}
                />
                <p
                  id="message-error"
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400 min-h-[1.25rem]"
                >
                  {errors.message ?? ''}
                </p>
              </div>

              <Button variant="primary" size="lg" type="submit">
                Gönder
              </Button>

              {submittedOk && !hasErrors ? (
                <p className="text-green-700 dark:text-green-300 font-semibold" role="status" aria-live="polite">
                  Mesajınız hazır! (LAB-4 kapsamında sunucuya gönderim yapılmıyor.)
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center py-6 px-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>© 2026 Fatmanur Türk. Tüm hakları saklıdır.</p>
      </footer>
    </>
  );
}

export default App;