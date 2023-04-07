import Layout from '../components/layout';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import 'swiper/css/bundle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}