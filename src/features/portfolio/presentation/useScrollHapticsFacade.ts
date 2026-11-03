import { useEffect, useRef, type RefObject } from 'react';
import { triggerInteractionFeedback } from '../../../core/presentation/interactionFeedback';

interface ScrollHapticsFacade {
  readonly contentRef: RefObject<HTMLDivElement | null>;
}

const INTERACTIVE_SECTIONS = '.mobile-stack-card, .website-project-card, .case-study-feature-section, .experience-entry';

export function useScrollHapticsFacade(): ScrollHapticsFacade {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return undefined;

    let observer: IntersectionObserver | undefined;
    const observeSections = () => {
      if (observer || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const item = entry.target as HTMLElement;
          const isInFocus = entry.isIntersecting && entry.intersectionRatio >= 0.32;
          const wasInFocus = item.dataset.hapticVisible === 'true';
          if (isInFocus && !wasInFocus) triggerInteractionFeedback();
          item.dataset.hapticVisible = String(isInFocus);
        }
      }, { threshold: [0, 0.32], rootMargin: '-12% 0px -12% 0px' });

      content.querySelectorAll<HTMLElement>(INTERACTIVE_SECTIONS).forEach(item => observer?.observe(item));
    };

    if (Number.parseFloat(window.getComputedStyle(content).opacity) > 0.5) {
      observeSections();
    } else {
      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'opacity' && Number.parseFloat(window.getComputedStyle(content).opacity) > 0.5) observeSections();
      };
      content.addEventListener('transitionend', onTransitionEnd);
      return () => content.removeEventListener('transitionend', onTransitionEnd);
    }

    return () => observer?.disconnect();
  }, []);

  return { contentRef };
}
