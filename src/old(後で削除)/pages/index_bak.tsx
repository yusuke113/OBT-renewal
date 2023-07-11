import Head from 'next/head';
import styles from '../styles/Top.module.scss';
import { Solve } from 'old(後で削除)/components/pages/home/solve';
import { useEffect, useState } from 'react';

export default function Home() {
  // 型定義
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    console.log('scroll');
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    setScrollPosition(currentPosition);
  };

  return (
    <>
      <Head>
        <title>小幡大貴ポートフォリオ | 小幡大貴</title>
        <meta name="description" content="小幡大貴ポートフォリオ | 小幡大貴" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.top}>
        {/* メインビジュアル */}
        <section>
          <div className={styles.mainVisual}>
            <div className={styles.title_area}>
              <p className={styles.top_text}>
                <span>solve business challenges with video</span>
              </p>
              <div className={styles.title}>
                <p>
                  <span>for mass production</span>
                </p>
                <p>
                  <span>of videos</span>
                </p>
                <p>
                  <span>video plant</span>
                </p>
              </div>
              <div className={styles.sub_title}>
                <span>動画の大量生産ならvideo plant</span>
              </div>
            </div>
          </div>
        </section>
        {/* / メインビジュアル */}
        {/* Solve */}
        <Solve scrollPosition={scrollPosition} />
        {/* / Solve */}
        <section>
          <div className={styles.ttt}></div>
        </section>
      </div>
    </>
  );
}
