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

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    InertialScrolling();
  }, []);

  const handleResize = () => {
    const viewport = viewportRef.current;
    const scrollContainer = scrollContainerRef.current;
    const vh = scrollContainer.offsetHeight;

    viewport.style.height = `${vh}px`;
    scrollContainer.style.height = `${vh}px`;

    console.log('resize');
  };

  // ScrollTriggerで慣性スクロールの関数
  const InertialScrolling = () => {
    console.log('inertial');

    const viewport = viewportRef.current;
    const scrollContainer = scrollContainerRef.current;

    gsap.to(scrollContainer, {
      top: () => -viewport.offsetHeight + window.innerHeight,
      // ease: 'none',
      scrollTrigger: {
        // trigger: viewport,
        trigger: document.body,
        start: 'top top',
        end: 'bottom end',
        scrub: 0.8,
        markers: true,
      },
    });
  };

  return (
    <>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.scroll_container} ref={scrollContainerRef}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
