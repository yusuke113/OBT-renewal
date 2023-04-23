import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';
import styles from '../../../styles/Top.module.scss';

// ScrollTriggerの内部変数をリセット
ScrollTrigger.defaults({ reset: true });
gsap.registerPlugin(ScrollTrigger);

type Solve = {
  scrollPosition: number;
};

export const Solve = ({ scrollPosition }) => {
  const didEffect = useRef(false);
  const secBgRef = useRef(null);
  const msk1Ref = useRef([]);
  const msk2Ref = useRef([]);
  const subRef = useRef(null);
  const solveRef = useRef(null);
  const secTtlRef = useRef(null);

  useLayoutEffect(() => {
    if (didEffect.current) return;
    didEffect.current = true;
    circleAnimation();
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
    const radius = Math.sqrt(ctrW * ctrW + mdlH * mdlH);

    const solve = solveRef.current;
    const secTtl = secTtlRef.current;
    const secbg = secBgRef.current;
    const msk1 = msk1Ref.current;
    const sub = subRef.current;

    let ajst = 0.3 * winH;
    solve.style.height = `${winH * 1.5 - ajst}px`;

    secbg.style.height = `${winH}px`;
    secTtl.style.height = `${winH}px`;

    // msk1に[top, left, width, height]を設定
    msk1.map((item) => {
      item.style.top = `-${radius}px`;
      item.style.left = `-${radius}px`;
      item.style.width = `${radius * 2}px`;
      item.style.height = `${radius * 2}px`;
    });

    sub.style.top = `-${winH / 2}px`;
    sub.style.left = `-${winW / 2}px`;
    sub.style.width = `${winW}px`;
    sub.style.height = `${winH}px`;
  };

  const circleAnimation = () => {
    const winH = window.innerHeight;
    let ajst = 0.3 * winH;
    const header = document.querySelector('header');
    const solve = solveRef.current;
    const msk2 = msk2Ref.current;
    const secTtl = secTtlRef.current;

    // スクロールトリガーの設定
    gsap.to(msk2, {
      width: '100%',
      height: '100%',
      duration: 1,
      scrollTrigger: {
        trigger: solve,
        start: `center+=${winH * 1.5 - ajst - winH} center`,
        end: `bottom+=${winH * 1.5 - ajst - winH} top`,
        toggleActions: 'restart none restart none',
        scrub: 0.8,
        // scrub: 1,
        markers: true, // マーカー表示
        // endを超えたときのみabsクラスを付与
        onEnterBack: ({ isActive }) => {
          if (isActive) {
            header.classList.remove('hidden');
            secTtl.classList.remove('abs');
          }
        },
        onLeave: ({ isActive }) => {
          if (isActive) {
            header.classList.remove('hidden');
            secTtl.classList.remove('abs');
          } else {
            header.classList.add('hidden');
            secTtl.classList.add('abs');
          }
        },
        onToggle: ({ isActive }) => {
          if (isActive) {
            header.classList.remove('hidden');
            secTtl.classList.remove('abs');
          }
        },
      },
    });
  };

  return (
    <>
      <section className={styles.sss}>
        <div className={styles.solve_sec} ref={solveRef} data-trigger>
          <div className={styles.secbg} ref={secBgRef}>
            <div className={styles.ctr_mdl}>
              <div className={styles.msk1} ref={(el) => (msk1Ref.current[0] = el)}>
                <div
                  className={`${styles.msk2} ${styles.circle}`}
                  ref={(el) => (msk2Ref.current[0] = el)}
                ></div>
              </div>
            </div>
          </div>
          <div className={`${styles.secttl}`} ref={secTtlRef}>
            <div className={styles.ctr_mdl}>
              <div className={styles.msk1} ref={(el) => (msk1Ref.current[1] = el)}>
                <div className={styles.msk2} ref={(el) => (msk2Ref.current[1] = el)}>
                  <div className={styles.ctr_mdl}>
                    <div className={styles.sub} ref={subRef}>
                      <h2>動画でビジネスの課題を解決</h2>
                    </div>
                  </div>
                </div>
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
