const skills = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind',
] as const;

export default function Skills() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Yetenekler
        </h2>
        <ul
          className="flex flex-wrap justify-center gap-2"
          role="list"
          aria-label="Yetenekler"
        >
          {skills.map((s) => (
            <li
              key={s}
              className="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

