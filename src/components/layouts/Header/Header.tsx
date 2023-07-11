import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
          <div className={styles.logo}>
            <a href="/">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </div>
        <nav>
          <ul>
            <li>
              <a href="#">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Works</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
