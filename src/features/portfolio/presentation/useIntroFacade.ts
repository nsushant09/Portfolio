import { useEffect, useState } from 'react';
import { INTRO_HOLD_MS, INTRO_TRANSITION_MS, type IntroPhase } from '../domain/intro';

export function useIntroFacade() {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof window === 'undefined') return 'home';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'home' : 'intro';
  });

  useEffect(() => {
    if (phase !== 'intro') return undefined;

    let homeTimer = 0;
    const transitionTimer = window.setTimeout(() => {
      setPhase('revealing');
      homeTimer = window.setTimeout(() => setPhase('home'), INTRO_TRANSITION_MS);
    }, INTRO_HOLD_MS);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(homeTimer);
    };
  }, []);

  return { phase, isHomeVisible: phase === 'home', isIntroVisible: phase !== 'home' };
}
