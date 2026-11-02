import type { CSSProperties } from 'react';
import DotGrid from '../../../core/ui/DotGrid';
import type { ColorPalette } from '../domain/colorPalettes';
import type { CaseStudyContent } from '../domain/selectedWork';
import { CustomCursor } from './CustomCursor';
import { ThemePullSwitch } from './ThemePullSwitch';

interface CaseStudyPageProps {
  readonly palette: ColorPalette;
  readonly isLightMode: boolean;
  readonly onToggleLighting: () => void;
  readonly project: CaseStudyContent;
}

type CaseStudyStyle = CSSProperties & {
  '--page': string;
  '--surface': string;
  '--primary': string;
  '--button-text': string;
  '--secondary': string;
  '--text': string;
  '--muted': string;
};

export function CaseStudyPage({ palette, isLightMode, onToggleLighting, project }: CaseStudyPageProps) {
  const style: CaseStudyStyle = {
    '--page': palette.colors.page,
    '--surface': palette.colors.surface,
    '--primary': palette.colors.primary,
    '--button-text': palette.colors.primaryForeground,
    '--secondary': palette.colors.secondary,
    '--text': palette.colors.text,
    '--muted': palette.colors.muted,
  };

  return (
    <main className="retro-page case-study-page" style={style}>
      <section aria-labelledby="case-study-title" className="case-study-hero">
        <div aria-hidden="true" className="case-study-dot-grid">
          <DotGrid activeColor={palette.colors.primary} baseColor={palette.colors.text} clickShock dotSize={3} enabled gap={26} opacity={0.48} proximity={145} strength={0.7} />
        </div>
        <a className="case-study-back" href="/#selected-work"><span aria-hidden="true">↖</span> Back to selected work</a>
        <div className="case-study-theme-switch"><ThemePullSwitch isLightMode={isLightMode} onToggle={onToggleLighting} /></div>
        <div className="case-study-hero-copy">
          <p className="case-study-kicker">{project.category} <span>·</span> {project.organization}</p>
          <h1 className="font-cinzel" id="case-study-title">{project.title}<span>.</span></h1>
          <p className="case-study-hero-description">{project.description}</p>
          <a className="case-study-down-link" href="#project-overview"><span aria-hidden="true">↓</span> Explore the project</a>
        </div>
        <div aria-hidden="true" className="case-study-hero-orbit">
          <span className="case-study-hero-orbit__outer" />
          <span className="case-study-hero-orbit__inner" />
          <span className="case-study-hero-orbit__core">{project.id === 'look-to-pace' ? 'PACE' : '02'}</span>
        </div>
        <span aria-hidden="true" className="case-study-hero-index">CASE STUDY / {project.id === 'look-to-pace' ? '01' : '02'}</span>
      </section>

      <div className="case-study-content" id="project-overview">
        <section aria-label="Project overview" className="case-study-facts">
          <div><span>Role</span><b>{project.role}</b></div>
          <div><span>Organization</span><b>{project.organization}</b></div>
          <div><span>Format</span><b>{project.format}</b></div>
          <div><span>Study</span><b>{project.study}</b></div>
        </section>

        <section aria-labelledby="case-context-title" className="case-study-story case-study-story--lead">
          <p className="case-study-story-index">01 / The research</p>
          <div>
            <h2 className="font-cinzel" id="case-context-title">{project.contextTitle}</h2>
            <p>{project.contextBody}</p>
          </div>
        </section>

        <section aria-labelledby="case-system-title" className="case-study-system-panel">
          <div className="case-study-system-copy">
            <p className="case-study-story-index">02 / The interaction</p>
            <h2 className="font-cinzel" id="case-system-title">{project.interactionTitle}</h2>
            <p>{project.interactionBody}</p>
          </div>
          <div aria-label={`${project.flowLabels.join(', ')}`} className="case-study-flow">
            <div><span>01</span><b>{project.flowLabels[0]}</b></div><i aria-hidden="true">→</i><div><span>02</span><b>{project.flowLabels[1]}</b></div><i aria-hidden="true">→</i><div className="case-study-flow-result"><span>03</span><b>{project.flowLabels[2]}</b></div>
          </div>
        </section>

        <section aria-labelledby="case-study-frame-title" className="case-study-story case-study-study">
          <p className="case-study-story-index">03 / The study frame</p>
          <div>
            <h2 className="font-cinzel" id="case-study-frame-title">{project.studyTitle}</h2>
            <p>{project.studyBody}</p>
            <div className="project-card-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </div>
        </section>

        <footer className="case-study-footer">
          <a className="retro-button case-study-back-button" href="/#selected-work">Back to selected work <span aria-hidden="true">↗</span></a>
          <a href={`mailto:hello@sushantneupane.com?subject=${encodeURIComponent(project.title)}`}>Discuss a project <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
      <CustomCursor />
    </main>
  );
}
