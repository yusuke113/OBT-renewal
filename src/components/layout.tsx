import { ReactNode } from 'react';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
