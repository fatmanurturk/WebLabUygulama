import type { Project } from '../../types/project';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} ekran görüntüsü`}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      ) : null}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          {project.featured ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
              Öne Çıkan
            </span>
          ) : null}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          {project.year} · {project.category}
        </p>
      </div>
    </article>
  );
}

