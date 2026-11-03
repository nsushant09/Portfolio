import { useEffect, useRef, type RefObject } from 'react';

interface HorizontalWorkRefs {
  readonly sectionRef: RefObject<HTMLElement | null>;
  readonly trackRef: RefObject<HTMLDivElement | null>;
}

export function useHorizontalWorkFacade(): HorizontalWorkRefs {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let travelDistance = 0;
    let sectionScrollDistance = 0;
    let animationFrame = 0;

    const measure = () => {
      if (media.matches) {
        section.style.height = 'auto';
        track.style.transform = '';
        travelDistance = 0;
        sectionScrollDistance = 0;
        updateMobileProgress();
        return;
      }

      const previousTransform = track.style.transform;
      track.style.transform = 'none';
      const lastCard = track.lastElementChild;
      const lastCardBounds = lastCard?.getBoundingClientRect();
      const centeredLeft = lastCardBounds ? (window.innerWidth - lastCardBounds.width) / 2 : 0;
      travelDistance = Math.max(0, (lastCardBounds?.left ?? 0) - centeredLeft);
      track.style.transform = previousTransform;

      const endPause = Math.min(window.innerHeight * 0.04, 40);
      sectionScrollDistance = travelDistance + endPause;
      section.style.height = `${window.innerHeight + sectionScrollDistance}px`;
      updatePosition();
    };

    const updatePosition = () => {
      animationFrame = 0;
      if (media.matches || travelDistance <= 0) return;

      const bounds = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / travelDistance));
      track.style.transform = `translate3d(${-progress * travelDistance}px, 0, 0)`;
      section.style.setProperty('--website-progress', progress.toFixed(4));
    };

    const requestPositionUpdate = () => {
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(updatePosition);
    };

    const updateMobileProgress = () => {
      const windowElement = section.querySelector<HTMLElement>('.website-work-window');
      if (!windowElement) return;
      const maxScroll = windowElement.scrollWidth - windowElement.clientWidth;
      const progress = maxScroll > 0 ? windowElement.scrollLeft / maxScroll : 0;
      section.style.setProperty('--website-progress', progress.toFixed(4));
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    const websiteWindow = section.querySelector<HTMLElement>('.website-work-window');
    websiteWindow?.addEventListener('scroll', updateMobileProgress, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', requestPositionUpdate, { passive: true });
    media.addEventListener('change', measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      websiteWindow?.removeEventListener('scroll', updateMobileProgress);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', requestPositionUpdate);
      media.removeEventListener('change', measure);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return { sectionRef, trackRef };
}
