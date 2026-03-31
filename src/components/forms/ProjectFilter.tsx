import type { Category, SortField, SortOrder } from '../../types/project';

interface ProjectFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category | 'all';
  onCategoryChange: (value: Category | 'all') => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
  resultCount: number;
  totalCount: number;
}

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'backend', label: 'Backend' },
];

export default function ProjectFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  resultCount,
  totalCount,
}: ProjectFilterProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Arama */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Proje ara (başlık, açıklama, teknoloji)..."
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pl-10 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          aria-label="Proje ara"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔎
        </span>
      </div>

      {/* Kategori + Sıralama */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Kategori butonları */}
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Kategori filtresi">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value)}
              aria-pressed={category === cat.value}
              className={[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900',
                category === cat.value
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sıralama */}
        <div className="flex gap-2 items-center">
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value as SortField)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            aria-label="Sıralama alanı"
          >
            <option value="year">Yıl</option>
            <option value="title">Başlık</option>
          </select>

          <button
            type="button"
            onClick={() =>
              onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            aria-label={`Sıralama yönü: ${
              sortOrder === 'asc' ? 'artan' : 'azalan'
            }`}
          >
            {sortOrder === 'asc' ? '↑ Artan' : '↓ Azalan'}
          </button>
        </div>
      </div>

      {/* Sonuç sayısı */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {resultCount} / {totalCount} proje gösteriliyor
      </p>
    </div>
  );
}

