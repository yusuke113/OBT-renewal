import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';
import styles from '../styles/components/Layout.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

type LayoutProps = {
  children: ReactNode;
};

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ reset: true });

export default function Layout({ children }: LayoutProps) {
  const viewportRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const fps = 60; // フレームレート

  let touch_flag = 'false';
  let scroll_flag = 'true';
  let scroll_y = 0;
  let scroll_y2 = 0;
  let scroll_x = 0;

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', scroll_func_);
    InertialScroll();
  }, []);

  const handleResize = () => {
    const viewport = viewportRef.current;
    const scrollContainer = scrollContainerRef.current;
    const vh = scrollContainer.offsetHeight;

    viewport.style.height = `${vh}px`;
    // scrollContainer.style.height = `${vh}px`;

    console.log('resize');
  };

  function scroll_func_() {
    scroll_y = document.documentElement.scrollTop || document.body.scrollTop;
    scroll_x = document.documentElement.scrollLeft || document.body.scrollLeft;
    scroll_func();
  }

  function scroll_func() {
    if (touch_flag == 'true' && scroll_flag == 'true') {
      scroll_y2 = scroll_y;
      InertialScroll();
    }
  }

  // ScrollTriggerで慣性スクロールの関数
  const InertialScroll = () => {
    let scroll_y2 = scroll_y;
    let trg = 0;

    const scrollContainer = scrollContainerRef.current;

    let cntscr_settimer = setInterval(function () {
      // 慣性スクロール
      if (touch_flag == 'false') {
        // タッチ操作が行われていない場合に実行する
        if (scroll_flag == 'true') {
          // スクロールが発生している場合に実行する
          trg = scroll_y; // 目標位置を現在のスクロール位置とする
          scroll_y2 = scroll_y2 + (trg - scroll_y2) / 5; // 目標位置に向かってスクロール位置を徐々に移動する

          if (Math.abs(trg - scroll_y2) < 0.5) {
            // 移動量が一定値以下になった場合は、スクロール位置を目標位置に設定する
            scroll_y2 = trg;
          }

          // Y軸のスクロール位置を設定する
          if (touch_flag == 'false') {
            // topプロパティでやる場合
            scrollContainer.style.top = `-${Math.round(scroll_y2)}px`;

            // transformでやる場合(画面のカクつき防止はtransformのほうが良い)
            // scrollContainer.style.transform = `translateY(${-Math.round(scroll_y2)}px)`;
          }
        }
      }
    }, 1000 / fps);
  };

  return (
    <>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.scroll_container} id="scroll_container" ref={scrollContainerRef}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
