import type { CSSProperties } from 'react';
import { WORK_EXPERIENCE } from '../domain/experienceTimeline';
import { useExperienceTimelineFacade } from './useExperienceTimelineFacade';

export function ExperienceTimeline() {
  const { sectionRef, activeExperienceId } = useExperienceTimelineFacade();

  return (
    <section aria-labelledby="experience-title" className="experience-section" ref={sectionRef}>
      <div aria-label="Products, research, teaching — Kathmandu to Zittau to Melbourne" className="experience-marquee">
        <p className="sr-only">A career across product engineering, research, and teaching, from Kathmandu to Zittau to Melbourne.</p>
        <div aria-hidden="true" className="capability-track">
          <span>Products <b>✳</b> Research <b>✳</b> Teaching <b>✳</b> Kathmandu <b>→</b> Zittau <b>→</b> Melbourne <b>✳</b> 2022 — Now <b>✳</b></span>
          <span>Products <b>✳</b> Research <b>✳</b> Teaching <b>✳</b> Kathmandu <b>→</b> Zittau <b>→</b> Melbourne <b>✳</b> 2022 — Now <b>✳</b></span>
        </div>
      </div>

      <div className="experience-content">
        <header className="experience-intro">
          <p className="experience-kicker">Beyond the selected work <span>/</span> The journey</p>
          <h2 className="font-cinzel" id="experience-title">A path shaped by building, researching, and teaching.</h2>
          <p>From Android products in Kathmandu to cloud systems in Germany, immersive research and UI/UX teaching in Melbourne.</p>
        </header>

        <div aria-label="Work experience timeline, newest first" className="experience-timeline">
          <div aria-hidden="true" className="experience-rail"><span /></div>
          <ol className="experience-track">
            {WORK_EXPERIENCE.map((experience, index) => {
              const isActive = experience.id === activeExperienceId;
              return (
                <li
                  aria-current={isActive ? 'step' : undefined}
                  className={`experience-entry ${isActive ? 'experience-entry--active' : ''}`}
                  data-experience-id={experience.id}
                  key={experience.id}
                  style={{ '--experience-index': index, '--experience-top': `${92 + index * 16}px`, '--experience-scale': 1 - (WORK_EXPERIENCE.length - index - 1) * 0.018 } as CSSProperties}
                >
                  <span aria-hidden="true" className="experience-entry-marker">0{index + 1}</span>
                  <article className="experience-card">
                    <div className="experience-card-meta"><span>{experience.field}</span><span>{experience.period}</span></div>
                    <h3 className="font-cinzel">{experience.role}</h3>
                    <div className="experience-card-organization"><b>{experience.organization}</b><span>{experience.location}</span></div>
                    <ul>{experience.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
                    <div className="experience-tools">{experience.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
