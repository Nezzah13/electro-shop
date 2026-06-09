import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { Button } from '../../components/ui/Button/Button';
import { Loader } from '../../components/ui/Loader/Loader';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setIsLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (!ignore) setProduct(data);
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
  }, [id]);

  if (isLoading) return <Loader />;
  if (error || !product) {
    return <p className={styles.error}>{error ?? 'Товар не найден'}</p>;
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Назад в каталог
      </Link>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
          <h1 className={styles.title}>{product.title}</h1>
          {product.brand && <p className={styles.brand}>Бренд: {product.brand}</p>}
          <p className={styles.description}>{product.description}</p>

          <div className={styles.purchase}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <Button onClick={() => addItem(product)}>Добавить в корзину</Button>
          </div>

          <p className={styles.stock}>В наличии: {product.stock} шт.</p>
        </div>
      </div>
    </div>
  );
}
