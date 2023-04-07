import styles from '../../styles/components/layouts/Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Works</a>
          <a href="#">Contact</a>
        </nav>
        <small>© OBATA All rights reserved.</small>
      </div>
    </footer>
  )
}