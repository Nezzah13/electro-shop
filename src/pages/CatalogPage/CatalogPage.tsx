import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api/products';
import type { Product } from '../../types';
import type { Category } from '../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { Loader } from '../../components/ui/Loader/Loader';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError(null);

    getProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const query = debouncedSearch.toLowerCase().trim();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query));
  }, [products, category, debouncedSearch]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Техника, которая работает на вас</h1>
        <p className={styles.heroSubtitle}>
          Смартфоны, ноутбуки, планшеты и аксессуары — всё в одном месте.
        </p>
      </section>

      <div className={styles.controls}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {isLoading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {!isLoading && !error && <ProductGrid products={visibleProducts} />}
    </div>
  );
}
