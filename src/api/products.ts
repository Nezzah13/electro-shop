import { BASE_URL, CATEGORIES } from '../utils/constants';
import type { Product } from '../types';

interface CategoryResponse {
  products: Product[];
}

export async function getProducts(): Promise<Product[]> {
  const requests = CATEGORIES.map((category) =>
    fetch(`${BASE_URL}/products/category/${category}`).then((res) => {
      if (!res.ok) {
        throw new Error(`Не удалось загрузить категорию: ${category}`);
      }
      return res.json() as Promise<CategoryResponse>;
    }),
  );

  const results = await Promise.all(requests);
  return results.flatMap((result) => result.products);
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Товар не найден');
  }
  return res.json() as Promise<Product>;
}
