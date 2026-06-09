import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/constants';
import styles from './CartPage.module.css';

export function CartPage() {
  const { items, totalPrice, removeItem, changeQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h1 className={styles.emptyTitle}>Ваша корзина пуста</h1>
        <p>Самое время выбрать что-нибудь полезное.</p>
        <Link to="/" className={styles.emptyLink}>
            Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Корзина</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <img src={item.thumbnail} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <span className={styles.name}>{item.title}</span>
              <span className={styles.unitPrice}>{formatPrice(item.price)}</span>
            </div>
            <div className={styles.quantity}>
              <button
                className={styles.qtyButton}
                onClick={() => changeQuantity(item.id, item.quantity - 1)}
                aria-label="Уменьшить"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className={styles.qtyButton}
                onClick={() => changeQuantity(item.id, item.quantity + 1)}
                aria-label="Увеличить"
              >
                +
              </button>
            </div>
            <span className={styles.subtotal}>
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              className={styles.remove}
              onClick={() => removeItem(item.id)}
              aria-label="Удалить"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <button className={styles.clear} onClick={clearCart}>
            Очистить корзину
        </button>
        <div className={styles.total}>
          <span>Итого:</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </div>
    </div>
  );
}
