import { useEffect, useMemo, useState } from 'react';
import Alert from '../ui/Alert';
import { fetchProjects } from '../../services/projectService';
import type { Category, Project, SortField, SortOrder } from '../../types/project';
import { applyFilters } from '../../utils/projectHelpers';
import ProjectCard from './ProjectCard';
import ProjectFilter from '../forms/ProjectFilter';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata oluştu.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = useMemo(
    () => applyFilters(projects, search, category, sortField, sortOrder),
    [projects, search, category, sortField, sortOrder],
  );

  return (
    <section id="projects" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Projelerim
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Üzerinde çalıştığım projeler
        </p>

        {error ? (
          <div className="mb-6">
            <Alert variant="error" title="Hata">
              {error}
            </Alert>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm text-red-600 dark:text-red-300 underline mt-2"
            >
              Tekrar dene
            </button>
          </div>
        ) : null}

        {!loading && !error ? (
          <ProjectFilter
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sortField={sortField}
            onSortFieldChange={setSortField}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            resultCount={filtered.length}
            totalCount={projects.length}
          />
        ) : null}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-transparent border-t-green-700" />
          </div>
        ) : null}

        {!loading && !error && filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            Eşleşen proje bulunamadı.
          </p>
        ) : null}

        {!loading && !error && filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

