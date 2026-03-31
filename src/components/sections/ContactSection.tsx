import ContactForm from '../forms/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          İletişim
        </h2>

        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

