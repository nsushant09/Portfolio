import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          window.getComputedStyle(target).cursor === 'pointer';
        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: 'translate3d(-100px, -100px, 0)'
      }}
    >
      {/* Precision Core Dot */}
      <div
        className={`w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--glow)] transition-transform duration-75 flex items-center justify-center ${
          isClicked ? 'scale-75' : isPointer ? 'scale-125' : 'scale-100'
        }`}
      >
        {isPointer && (
          <span className="w-1 h-1 rounded-full bg-[var(--bg)]" />
        )}
      </div>

      {/* Crisp Non-delayed Glow Ring */}
      <div
        className={`absolute -top-2.5 -left-2.5 w-7.5 h-7.5 rounded-full border transition-all duration-100 ${
          isPointer
            ? 'border-[var(--accent)] bg-[var(--accent)]/15 scale-110 shadow-[0_0_10px_var(--glow)]'
            : isClicked
            ? 'border-[var(--accent-2)] scale-90'
            : 'border-[var(--accent)]/30 scale-75 opacity-50'
        }`}
      />
    </div>
  );
};
