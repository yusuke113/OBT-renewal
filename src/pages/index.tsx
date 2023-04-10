import Head from 'next/head';
import styles from '../styles/Top.module.scss';
import { Solve } from 'components/pages/top/solve';


export default function Home() {
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
        <Solve />
        {/* / Solve */}
        <section>
          <div className={styles.ttt}></div>
        </section>
      </div>
    </>
  );
}
