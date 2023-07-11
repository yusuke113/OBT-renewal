import { ReactNode } from 'react';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={styles.viewport}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
