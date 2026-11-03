import { useCallback, useEffect, useRef, useState } from 'react';

export type ActiveNavigationSection = 'home' | 'works' | 'about';

export function useNavigationFacade(enabled: boolean) {
  const [activeSection, setActiveSection] = useState<ActiveNavigationSection>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(open => !open);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    if (!enabled) return undefined;

    let previousScrollY = window.scrollY;
    let animationFrame = 0;

    const updateNavigation = () => {
      const aboutElement = document.getElementById('about-me');
      const worksElement = document.getElementById('selected-work');

      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      const activeLine = window.innerHeight * 0.38;
      const aboutTop = aboutElement?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const worksTop = worksElement?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;

      if (aboutTop <= activeLine) setActiveSection('about');
      else if (worksTop <= activeLine) setActiveSection('works');
      else setActiveSection('home');
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < previousScrollY;

        if (isMenuOpen || currentScrollY < 64) setIsNavigationVisible(true);
        else if (Math.abs(currentScrollY - previousScrollY) > 4) setIsNavigationVisible(scrollingUp);

        previousScrollY = currentScrollY;
        updateNavigation();
      });
    };

    updateNavigation();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [enabled, isMenuOpen]);

  return { activeSection, isMenuOpen, isNavigationVisible, menuButtonRef, closeMenu, toggleMenu };
}
