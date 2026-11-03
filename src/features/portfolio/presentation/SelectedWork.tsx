import type { CSSProperties } from 'react';
import { CASE_STUDIES, MOBILE_PROJECTS, WEBSITE_PROJECTS, destinationLabel, type CaseStudyContent, type PortfolioProjectPreview } from '../domain/selectedWork';
import { useHorizontalWorkFacade } from './useHorizontalWorkFacade';

type ProjectKind = 'mobile' | 'website';
type ProjectStyle = CSSProperties & { '--project-index': number };
type StackCardStyle = CSSProperties & { '--stack-index': number; '--stack-top': string; '--stack-scale': number };

function ProjectArtwork({ project, kind, index }: { readonly project: PortfolioProjectPreview; readonly kind: ProjectKind; readonly index: number }) {
  if (kind === 'website') {
    return (
      <div className={`project-artwork project-artwork--website project-artwork--website-${index + 1}`}>
        <span aria-hidden="true" className="website-image-backing" />
        <div className="website-image-frame">
          {project.image
            ? <img alt={project.imageAlt ?? `${project.title} website screenshot`} className="website-image" decoding="async" loading="lazy" src={project.image} />
            : <div className="website-image-placeholder">
                <span className="website-placeholder-top"><i /><i /><i /><b>{project.title.toUpperCase()}</b></span>
                <span className="website-placeholder-layout"><i /><b /><em /></span>
                <span className="website-placeholder-label">Website image goes here</span>
              </div>}
          {project.image && <span aria-hidden="true" className="website-image-tint" />}
        </div>
        <span aria-hidden="true" className="website-image-index">WEB / 0{index + 1}</span>
      </div>
    );
  }

  return (
    <div className={`project-artwork project-artwork--${kind} project-artwork--${kind}-${index + 1}`}>
      {kind === 'mobile' && project.screenshots?.length
        ? <div aria-label={`${project.title} app screenshots`} className="mobile-screen-gallery" role="region" tabIndex={0}>
            {project.screenshots.map((screenshot, screenshotIndex) => (
              <div className={`mobile-screen-preview mobile-screen-preview--${screenshotIndex + 1}`} key={screenshot.src}>
                <img alt={screenshot.alt} decoding="async" loading="lazy" src={screenshot.src} />
              </div>
            ))}
          </div>
        : project.image
        ? <img alt={project.imageAlt ?? `${project.title} project preview`} className="project-artwork-image" decoding="async" loading="lazy" src={project.image} />
        : <div aria-hidden="true" className="project-artwork-placeholder">
            <span className="placeholder-frame"><i /><i /><i /><b /><em /></span>
            <span className="placeholder-index">{kind === 'mobile' ? 'APP' : 'WEB'} / 0{index + 1}</span>
          </div>}
      <span aria-hidden="true" className="project-artwork-tint" />
      {!project.image && !project.screenshots?.length && kind === 'mobile' && <span className="project-artwork-label">Project imagery<br />coming soon</span>}
      <span className="project-artwork-corner" aria-hidden="true">0{index + 1}</span>
    </div>
  );
}

function MobileProjectCard({ project, index }: { readonly project: PortfolioProjectPreview; readonly index: number }) {
  const style: CSSProperties = {
    '--stack-index': index,
    '--stack-depth': MOBILE_PROJECTS.length - index - 1,
    '--stack-top': `${78 + index * 18}px`,
    '--stack-scale': 1 - (MOBILE_PROJECTS.length - index - 1) * 0.025,
  } as StackCardStyle;

  const content = (
    <>
      <ProjectArtwork index={index} kind="mobile" project={project} />
      <div className="mobile-stack-copy">
        <p className="project-card-kicker">Mobile applications <span>/</span> 0{index + 1}</p>
        <h3 className="font-cinzel">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <span className="project-preview-note">{project.note}</span>
        {project.destinations.length > 0 && <div aria-label={`${project.title} links`} className="project-destinations">
          {project.destinations.map(destination => <a href={destination.url} key={`${destination.kind}-${destination.url}`} rel="noreferrer" target="_blank">{destinationLabel(destination)} <span aria-hidden="true">↗</span></a>)}
        </div>}
      </div>
    </>
  );

  return <article className="mobile-stack-card" style={style}>{content}</article>;
}

function MobileWorkSection() {
  return (
    <section aria-labelledby="mobile-work-title" className="mobile-work-section">
      <div className="portfolio-section-heading">
        <div><p className="portfolio-section-kicker">Mobile apps</p><h3 className="font-cinzel" id="mobile-work-title">Android and cross-platform projects.</h3></div>
      </div>
      <div className="mobile-stack-track">
        {MOBILE_PROJECTS.map((project, index) => <MobileProjectCard index={index} key={project.id} project={project} />)}
      </div>
    </section>
  );
}

function WebsiteWorkSection() {
  const { sectionRef, trackRef } = useHorizontalWorkFacade();

  return (
      <section aria-labelledby="website-work-title" className="website-work-section" ref={sectionRef}>
        <div className="website-work-stage">
          <div className="website-work-heading">
            <div><p className="portfolio-section-kicker">Websites</p><h3 className="font-cinzel" id="website-work-title">Client and product websites.</h3></div>
            <p className="website-work-cue">Swipe to explore <span aria-hidden="true">→</span></p>
          </div>
          <div aria-label="Website projects. Swipe horizontally to explore." className="website-work-window" role="region" tabIndex={0}>
            <div className="website-work-track" ref={trackRef}>
              {WEBSITE_PROJECTS.map((project, index) => {
                const destination = project.destinations[0];
                const content = (
                  <>
                    <ProjectArtwork index={index} kind="website" project={project} />
                    <div className="website-project-copy">
                      <span className="project-card-kicker">Websites <span>/</span> 0{index + 1}</span>
                      <h4 className="font-cinzel">{project.title}</h4>
                      <p>{project.description}</p>
                      <span className="project-preview-note">{project.note}</span>
                      <span className="website-project-open">{destination ? 'Visit website' : 'Project link to be added'} <b aria-hidden="true">{destination ? '↗' : '·'}</b></span>
                    </div>
                  </>
                );
                const cardClass = 'website-project-card';
                const cardStyle = { '--project-index': index } as ProjectStyle;

                return destination
                  ? <a aria-label={`Visit ${project.title} website in a new tab`} className={cardClass} href={destination.url} key={project.id} rel="noreferrer" style={cardStyle} target="_blank">{content}</a>
                  : <article aria-label={`${project.title} project preview`} className={cardClass} key={project.id} style={cardStyle}>{content}</article>;
              })}
            </div>
          </div>
          <div aria-hidden="true" className="website-work-progress"><span /></div>
        </div>
      </section>
  );
}

function CaseStudyFeature({ project, index }: { readonly project: CaseStudyContent; readonly index: number }) {
  const style: CSSProperties = {
    '--case-study-index': index,
    '--case-study-top': `${78 + index * 20}px`,
    '--case-study-scale': 1 - index * 0.025,
  } as CSSProperties;

  return (
    <article aria-labelledby={`case-study-feature-title-${project.id}`} className={`case-study-feature-section ${index > 0 ? 'case-study-feature-section--preview' : ''}`} style={style}>
      <a className={`case-study-feature ${index > 0 ? 'case-study-feature--preview' : ''}`} href={`/work/${project.id}`}>
        <div className="case-study-feature-copy">
          <p className="project-card-kicker">{project.category}</p>
          <h3 className="font-cinzel" id={`case-study-feature-title-${project.id}`}>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-card-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <span className="case-study-feature-link">{index === 0 ? 'Explore case study' : 'Open layout preview'} <b aria-hidden="true">↗</b></span>
        </div>
        <div aria-hidden="true" className="case-study-feature-art">
          <span className="case-study-orbit case-study-orbit--outer" />
          <span className="case-study-orbit case-study-orbit--inner" />
          <span className="case-study-art-core">{index === 0 ? 'PACE' : '02'}</span>
          <span className="case-study-art-caption">{index === 0 ? 'Gaze / cadence / movement' : 'Context / approach / outcome'}</span>
        </div>
        <span className="case-study-feature-index" aria-hidden="true">CASE / 0{index + 1}</span>
      </a>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-title" className="selected-work-section" id="selected-work">
      <header className="selected-work-intro">
        <p className="selected-work-kicker">Portfolio</p>
        <h2 className="font-cinzel" id="selected-work-title">Selected projects.</h2>
        <p className="selected-work-summary">Mobile apps, websites, and digital product research.</p>
      </header>
      <MobileWorkSection />
      <div aria-hidden="true" className="work-section-divider"><span /></div>
      <WebsiteWorkSection />
      <section aria-labelledby="case-studies-title" className="case-studies-list">
        <header className="case-studies-heading">
          <p className="portfolio-section-kicker">Writing and research</p>
          <h3 className="font-cinzel" id="case-studies-title">Blogs, case studies &amp; papers.</h3>
        </header>
        {CASE_STUDIES.map((project, index) => <CaseStudyFeature index={index} key={project.id} project={project} />)}
      </section>
    </section>
  );
}
