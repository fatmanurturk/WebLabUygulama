import { useState, type FormEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validate(data: ContactFormData): FormErrors {
  const newErrors: FormErrors = {};

  const name = data.name.trim();
  if (!name) newErrors.name = 'Ad Soyad zorunludur.';
  else if (name.length < 2) newErrors.name = 'Ad Soyad en az 2 karakter olmalıdır.';

  const email = data.email.trim();
  if (!email) newErrors.email = 'E-posta zorunludur.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    newErrors.email = 'Geçerli bir e-posta adresi giriniz.';

  const subject = data.subject.trim();
  if (!subject) newErrors.subject = 'Konu zorunludur.';

  const message = data.message.trim();
  if (!message) newErrors.message = 'Mesaj zorunludur.';
  else if (message.length < 10) newErrors.message = 'Mesaj en az 10 karakter olmalıdır.';

  return newErrors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function handleChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch {
      alert('Gönderim başarısız. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center dark:bg-green-950/30 dark:border-green-900/60">
        <p className="text-green-800 dark:text-green-200 font-medium">
          Mesajınız başarıyla gönderildi!
        </p>
        <button
          type="button"
          onClick={() => setSubmitSuccess(false)}
          className="mt-4 text-sm text-green-700 dark:text-green-200 underline"
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg"
      noValidate
      aria-label="İletişim formu"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Ad Soyad
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600`}
          placeholder="Adınız Soyadınız"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? (
          <p role="alert" className="text-red-600 text-sm mt-1">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-posta
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600`}
          placeholder="ornek@mail.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? (
          <p role="alert" className="text-red-600 text-sm mt-1">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          Konu
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          } bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600`}
          aria-invalid={Boolean(errors.subject)}
        >
          <option value="">Konu seçiniz...</option>
          <option value="genel">Genel</option>
          <option value="destek">Teknik Destek</option>
          <option value="oneri">Öneri</option>
          <option value="isbirligi">İş Birliği</option>
        </select>
        {errors.subject ? (
          <p role="alert" className="text-red-600 text-sm mt-1">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mesaj
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 resize-y ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600`}
          placeholder="Mesajinizi yazınız..."
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <p role="alert" className="text-red-600 text-sm mt-1">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
      </button>
    </form>
  );
}

