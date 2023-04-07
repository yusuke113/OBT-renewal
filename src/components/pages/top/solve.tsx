import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styles from '../../../styles/Top.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const Solve = () => {
  const didEffect = useRef(false);
  const hhRef = useRef(null);
  const circleRef = useRef(null);
  const circleAreaRef = useRef(null);
  const solveRef = useRef(null);
  const solveFixedRef = useRef(null);

  useLayoutEffect(() => {
    if (didEffect.current) return;
    didEffect.current = true;
    circleAnimation(circleRef.current);
  }, []);

  useEffect(() => {
    // 画面四隅の斜めの距離を取得
    const diagonal = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));

    // diagonaの長さをcircleAreaRefのwidthとheightに設定
    circleAreaRef.current.style.width = `${diagonal}px`;
    circleAreaRef.current.style.height = `${diagonal}px`;

    hhRef.current.style.height = `${window.innerHeight}px`;
    solveFixedRef.current.style.height = `${window.innerHeight}px`;
    // solveRef.current.style.height = `${window.innerHeight + window.innerHeight / 2}px`;
    solveRef.current.style.height = `${window.innerHeight}px`;
  }, []);

  const circleAnimation = (target: HTMLDivElement | null) => {
    // スクロールトリガーの設定
    gsap.to(target, {
      width: '100%',
      height: '100%',
      scrollTrigger: {
        invalidateOnRefresh: true,
        trigger: solveRef.current,
        // solveRef.currentの頭が画面の中央に来た時を開始位置に設定
        start: 'center center',
        // end: 'bottom end',
        // end: 'bottom ${solveRef.current.offsetHeight}px',
        // trigger要素の最下部が画面下をendに設定
        end: 'bottom top',
        toggleActions: 'restart none restart none',
        scrub: 0.8,
        markers: true, // マーカー表示
        // endを超えたときのみabsクラスを付与
        onEnterBack: ({ isActive }) => {
          if (isActive) {
            solveFixedRef.current.classList.remove('abs');
            solveFixedRef.current.classList.add('fixed');
          }
        },
        onLeave: ({ isActive }) => {
          if (isActive) {
            solveFixedRef.current.classList.remove('abs');
            solveFixedRef.current.classList.add('fixed');
          } else {
            solveFixedRef.current.classList.add('abs');
            solveFixedRef.current.classList.remove('fixed');
          }
        },
        onToggle: ({ isActive }) => {
          if (isActive) {
            solveFixedRef.current.classList.add('fixed');
            solveFixedRef.current.classList.remove('abs');
          }
        },
      },
    });
  };

  return (
    <>
      <section className={styles.sss}>
        <div className={styles.solve} ref={solveRef} data-trigger>
          <div className={styles.solve_h} ref={hhRef}></div>
          <div className={`fixed ${styles.c}`} ref={solveFixedRef}>
            <div className={styles.circle_area} ref={circleAreaRef}>
              <div className={styles.circle} ref={circleRef}>
                <h2 className={styles.title}>動画でビジネスの課題を解決</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* / Solve */}
      <section>
        <div className={styles.ttt}></div>
      </section>
    </>
  );
};
