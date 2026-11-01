import { useEffect, useRef, type RefObject } from 'react';

export function useCustomCursorFacade(): RefObject<HTMLDivElement | null> {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!cursor || !finePointer.matches || reducedMotion.matches) return undefined;

    document.body.classList.add('custom-cursor-enabled');

    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add('custom-cursor--visible');
    };

    const updateHover = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      const interactive = event.target.closest('a, button, summary, [role="button"], input, textarea, select');
      cursor.classList.toggle('custom-cursor--hovering', interactive !== null);
    };

    const setPressed = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') cursor.classList.add('custom-cursor--pressed');
    };

    const releasePressed = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') cursor.classList.remove('custom-cursor--pressed');
    };

    const hideCursor = (event: PointerEvent) => {
      if (!event.relatedTarget) cursor.classList.remove('custom-cursor--visible', 'custom-cursor--hovering', 'custom-cursor--pressed');
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    window.addEventListener('pointerover', updateHover, { passive: true });
    window.addEventListener('pointerdown', setPressed, { passive: true });
    window.addEventListener('pointerup', releasePressed, { passive: true });
    window.addEventListener('pointerout', hideCursor);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerover', updateHover);
      window.removeEventListener('pointerdown', setPressed);
      window.removeEventListener('pointerup', releasePressed);
      window.removeEventListener('pointerout', hideCursor);
    };
  }, []);

  return cursorRef;
}
