import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styles from '../../../styles/Top.module.scss';

// ScrollTriggerの内部変数をリセット
ScrollTrigger.defaults({ reset: true });
gsap.registerPlugin(ScrollTrigger);

export const Solve = () => {
  const didEffect = useRef(false);
  const secbgRef = useRef(null);
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
    handleResize();
    window.addEventListener('resize', function () {
      handleResize();
    });
  }, []);

  const handleResize = () => {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const ctrW = winW / 2;
    const mdlH = winH / 2;
    // 画面四隅の斜めの距離を取得
    // const radius = Math.sqrt(ctrW * ctrW + mdlH * mdlH) + 5;
    const radius = Math.sqrt(ctrW * ctrW + mdlH * mdlH);
    const circleArea = circleAreaRef.current;
    const solveFixed = solveFixedRef.current;
    const secbg = secbgRef.current;

    // circleAreaにwidthとheightを設定
    circleArea.style.width = `${radius * 2}px`;
    circleArea.style.height = `${radius * 2}px`;

    secbg.style.height = `${winH}px`;
    solveFixed.style.height = `${winH}px`;

    solveRef.current.style.height = `${winH}px`;
  };

  const circleAnimation = (target: HTMLDivElement | null) => {
    // スクロールトリガーの設定
    gsap.to(target, {
      width: '100%',
      height: '100%',
      duration: 0.8,
      scrollTrigger: {
        // invalidateOnRefresh: true,
        trigger: solveRef.current,
        // solveRef.currentの頭が画面の中央に来た時を開始位置に設定
        start: 'center center',
        end: 'bottom top',
        toggleActions: 'restart none restart none',
        scrub: 0.8,
        markers: true, // マーカー表示
        // endを超えたときのみabsクラスを付与
        onEnterBack: ({ isActive }) => {
          if (isActive) {
            solveFixedRef.current.classList.add('fixed');
            solveFixedRef.current.classList.remove('abs');
          }
        },
        onLeave: ({ isActive }) => {
          if (isActive) {
            solveFixedRef.current.classList.add('fixed');
            solveFixedRef.current.classList.remove('abs');
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
          <div className={styles.secbg} ref={secbgRef}></div>
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
