import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './Header.module.css';

export function Header() {
  const { totalCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>⚡</span>
          Volt<span className={styles.logoAccent}>Store</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Каталог
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Корзина
            {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
