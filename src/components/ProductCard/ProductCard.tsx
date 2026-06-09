import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button/Button';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <div className={styles.body}>
        <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {product.title}
        </Link>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <Button onClick={() => addItem(product)}>В корзину</Button>
        </div>
      </div>
    </article>
  );
}
