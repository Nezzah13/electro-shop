import {
  CATEGORIES,
  CATEGORY_LABELS,
  type Category,
} from '../../utils/constants';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  active: Category | 'all';
  onChange: (category: Category | 'all') => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className={styles.list}>
      <button
        className={active === 'all' ? styles.active : styles.chip}
        onClick={() => onChange('all')}
      >
        Все
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={active === category ? styles.active : styles.chip}
          onClick={() => onChange(category)}
        >
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  );
}
