import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styles from '../styles/Top.module.scss';
import { Solve } from 'components/pages/top/solve';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const didEffect = useRef(false);
  const heightRef = useRef(null);
  const topRef = useRef(null);
  const viewportRef = useRef(null);

  useLayoutEffect(() => {
    if (didEffect.current) return;
    didEffect.current = true;
    InertialScrolling();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  // ScrollTriggerで慣性スクロールの関数
  const InertialScrolling = () => {
    console.log(-document.body.offsetHeight + window.innerHeight);
    
    gsap.to(viewportRef.current, {
      // top: -topRef.current.offsetHeight + window.innerHeight,
      top: () => -document.body.offsetHeight + window.innerHeight,
      // ease: 'none',
      duration: 0.3,
      scrollTrigger: {
        invalidateOnRefresh: true,
        trigger: viewportRef.current,
        start: 'top top',
        end: 'bottom end',
        scrub: 0.8,
        markers: true,
      },
    });
  };

  const handleResize = () => {
    console.log(topRef.current.offsetHeight);
    heightRef.current.style.height = `${topRef.current.offsetHeight}px`;
  };

  return (
    <>
      <Head>
        <title>小幡大貴ポートフォリオ | 小幡大貴</title>
        <meta name="description" content="小幡大貴ポートフォリオ | 小幡大貴" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={heightRef}>
        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.top} ref={topRef}>
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
        </div>
      </div>
    </>
  );
}
