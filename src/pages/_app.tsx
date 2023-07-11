import Layout from '../components/layouts/layout';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import 'swiper/css/bundle';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="/js/custom.js"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
