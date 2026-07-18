import Link from 'next/link';
import styles from './NavBar.module.css';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Analytics', href: '/admin-workspace/analytics' },
  { label: 'Test', href: '/test' },
];

export function NavBar() {
  return (
    <header className={styles.container}>
      <div className={styles.brand}>NSUG ENTERPRISE</div>
      <nav className={styles.navigation}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
