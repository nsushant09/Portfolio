import type { CSSProperties } from 'react';
import { ABOUT_CAPABILITIES, ABOUT_STORY, type AboutCapabilityId } from '../domain/about';
import { useAboutSectionFacade } from './useAboutSectionFacade';

function AboutIcon({ name }: { readonly name: AboutCapabilityId }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const, strokeWidth: 1.7 };

  if (name === 'mobile') {
    return <svg aria-hidden="true" viewBox="0 0 48 48" {...common}><rect x="14" y="4" width="20" height="40" rx="2" /><path d="M20 10h8M21 37h6" /><path d="M10 12H6v24h4M38 12h4v24h-4" /></svg>;
  }
  if (name === 'cloud') {
    return <svg aria-hidden="true" viewBox="0 0 48 48" {...common}><path d="M12 29a9 9 0 0 1 2-17 12 12 0 0 1 22 4 7 7 0 0 1 1 14H12Z" /><rect x="14" y="34" width="8" height="7" /><rect x="27" y="34" width="8" height="7" /><path d="M18 30v4m9-4v4M22 37h5" /></svg>;
  }
  if (name === 'devops') {
    return <svg aria-hidden="true" viewBox="0 0 48 48" {...common}><rect x="4" y="9" width="12" height="10" /><rect x="32" y="29" width="12" height="10" /><path d="M16 14h8a7 7 0 0 1 7 7v9m-4-4 4 4 4-4M32 34h-8a7 7 0 0 1-7-7v-8m4 4-4-4-4 4" /><path d="M8 14h4m24 20h4" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 48 48" {...common}><rect x="5" y="7" width="38" height="27" /><path d="M12 14h11M12 20h24M12 26h17M19 34v6m10-6v6m-15 0h20" /><circle cx="36" cy="14" r="2" /></svg>;
}

export function AboutSection() {
  const { sectionRef, isRevealed } = useAboutSectionFacade();

  return (
    <section
      aria-labelledby="about-title"
      className={`about-section ${isRevealed ? 'about-section--revealed' : ''}`}
      id="about-me"
      ref={sectionRef}
    >
      <header className="about-copy">
        <p className="about-kicker">About</p>
        <h2 className="font-cinzel about-title" id="about-title">
          <span className="about-title-line"><span>A builder by</span></span>
          <span className="about-title-line"><span>experience.</span></span>
          <span className="about-title-line about-title-line--accent"><span>A learner by nature.</span></span>
        </h2>
        <p className="about-introduction">{ABOUT_STORY.introduction}</p>
        <p className="about-story-text">{ABOUT_STORY.experience}</p>
        <p className="about-story-text about-story-text--current">{ABOUT_STORY.currentFocus}</p>
        <a className="about-contact-link" href="mailto:nsushant09@gmail.com?subject=Software%20engineering%20opportunity">Open to opportunities <span aria-hidden="true">↗</span></a>
      </header>

      <div aria-label="Areas I work in and am growing" className="about-capabilities" role="list">
        {ABOUT_CAPABILITIES.map((capability, index) => (
          <article className="about-capability" key={capability.id} role="listitem" style={{ '--about-index': index } as CSSProperties}>
            <div className="about-capability-top"><AboutIcon name={capability.id} /><span>0{index + 1}</span></div>
            <h3 className="font-cinzel">{capability.title}</h3>
            <p>{capability.description}</p>
            <span aria-hidden="true" className="about-capability-corner" />
          </article>
        ))}
      </div>
    </section>
  );
}
