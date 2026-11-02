import { useEffect, useRef, useState, type RefObject } from 'react';

interface ExperienceTimelineFacade {
  readonly sectionRef: RefObject<HTMLElement | null>;
  readonly activeExperienceId: string | null;
}

export function useExperienceTimelineFacade(): ExperienceTimelineFacade {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let animationFrame = 0;
    const updateTimeline = () => {
      animationFrame = 0;
      const entries = Array.from(section.querySelectorAll<HTMLElement>('[data-experience-id]'));
      const activeLine = window.innerHeight * 0.42;
      let nextActiveId = entries[0]?.dataset.experienceId ?? null;

      for (const entry of entries) {
        if (entry.getBoundingClientRect().top <= activeLine) {
          nextActiveId = entry.dataset.experienceId ?? nextActiveId;
        }
      }

      setActiveExperienceId(current => current === nextActiveId ? current : nextActiveId);

      const bounds = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      section.style.setProperty('--experience-progress', progress.toFixed(4));
    };

    const requestTimelineUpdate = () => {
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(updateTimeline);
    };

    const resizeObserver = new ResizeObserver(requestTimelineUpdate);
    resizeObserver.observe(section);
    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate, { passive: true });
    updateTimeline();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestTimelineUpdate);
      window.removeEventListener('resize', requestTimelineUpdate);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return { sectionRef, activeExperienceId };
}
