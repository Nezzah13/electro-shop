export const BASE_URL = 'https://dummyjson.com';

export const CATEGORIES = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  smartphones: 'Смартфоны',
  laptops: 'Ноутбуки',
  tablets: 'Планшеты',
  'mobile-accessories': 'Аксессуары',
};

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
