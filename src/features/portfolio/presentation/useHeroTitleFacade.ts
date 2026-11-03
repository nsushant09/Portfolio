import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';
import { triggerInteractionFeedback } from '../../../core/presentation/interactionFeedback';

export function useHeroTitleFacade(): {
  readonly titleRef: RefObject<HTMLHeadingElement | null>;
  readonly handlePointerEnter: (event: ReactPointerEvent<HTMLHeadingElement>) => void;
  readonly handlePointerMove: (event: ReactPointerEvent<HTMLHeadingElement>) => void;
  readonly resetPosition: () => void;
} {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType !== 'mouse' || reducedMotionRef.current) return;
    const radius = 155;
    event.currentTarget.querySelectorAll<HTMLElement>('.hero-title__char').forEach(character => {
      const bounds = character.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = centerX - event.clientX;
      const dy = centerY - event.clientY;
      const distance = Math.hypot(dx, dy);
      if (distance >= radius) {
        character.style.setProperty('--char-push-x', '0px');
        character.style.setProperty('--char-push-y', '0px');
        return;
      }

      const force = (1 - distance / radius) ** 2 * 25;
      const direction = distance === 0 ? 1 : 1 / distance;
      character.style.setProperty('--char-push-x', `${(dx * direction * force).toFixed(2)}px`);
      character.style.setProperty('--char-push-y', `${(dy * direction * force).toFixed(2)}px`);
    });
  }, []);

  const handlePointerEnter = useCallback((_event: ReactPointerEvent<HTMLHeadingElement>) => {
    triggerInteractionFeedback();
  }, []);

  const resetPosition = useCallback(() => {
    titleRef.current?.querySelectorAll<HTMLElement>('.hero-title__char').forEach(character => {
      character.style.setProperty('--char-push-x', '0px');
      character.style.setProperty('--char-push-y', '0px');
    });
  }, []);

  return { titleRef, handlePointerEnter, handlePointerMove, resetPosition };
}
