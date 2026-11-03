import { useEffect, useRef, useState, type RefObject } from 'react';

interface AboutSectionFacade {
  readonly sectionRef: RefObject<HTMLElement | null>;
  readonly isRevealed: boolean;
}

export function useAboutSectionFacade(): AboutSectionFacade {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.02, rootMargin: '0px' });
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return { sectionRef, isRevealed };
}
