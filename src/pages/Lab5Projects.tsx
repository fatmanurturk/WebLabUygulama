import { useEffect, useMemo, useState } from 'react';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { fetchProjects } from '../services/projectService';
import type { Category, Project, SortField, SortOrder } from '../types/project';
import { applyFilters } from '../utils/projectHelpers';

export default function Lab5Projects() {
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
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
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

  const categories: (Category | 'all')[] = ['all', 'frontend', 'fullstack', 'backend'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          LAB-5 Projelerim
        </h1>

        {error ? (
          <div className="mb-6">
            <Alert variant="error" title="Hata">
              {error}
            </Alert>
          </div>
        ) : null}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="w-full lg:w-80">
            <Input
              id="search"
              label="Arama"
              placeholder="Proje ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-end">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategory(cat)}
              >
                {cat === 'all' ? 'Tümü' : cat}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 items-end">
            <div className="space-y-1">
              <label
                htmlFor="sortField"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sırala
              </label>
              <select
                id="sortField"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
              >
                <option value="year">Yıl</option>
                <option value="title">Başlık</option>
              </select>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
            >
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Yükleniyor...</p>
        ) : null}

        {!loading && filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Eşleşen proje bulunamadı.
          </p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Card
              key={project.id}
              variant="elevated"
              title={project.title}
              image={project.image}
              imageAlt={`${project.title} ekran görüntüsü`}
            >
              <p className="text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {project.year} · {project.category}
              </p>
            </Card>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          {filtered.length} / {projects.length} proje gösteriliyor
        </p>
      </div>
    </div>
  );
}

