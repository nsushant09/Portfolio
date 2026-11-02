import type { CSSProperties } from 'react';
import { CASE_STUDIES, MOBILE_PROJECTS, WEBSITE_PROJECTS, type CaseStudyContent, type PortfolioProjectPreview } from '../domain/selectedWork';
import { useHorizontalWorkFacade } from './useHorizontalWorkFacade';
import { useWebsiteViewerFacade } from './useWebsiteViewerFacade';

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
            ? <img alt={project.imageAlt ?? `${project.title} website screenshot`} className="website-image" src={project.image} />
            : <div className="website-image-placeholder">
                <span className="website-placeholder-top"><i /><i /><i /><b>YOUR WEBSITE / 0{index + 1}</b></span>
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
      {project.image
        ? <img alt={project.imageAlt ?? `${project.title} project preview`} className="project-artwork-image" src={project.image} />
        : <div aria-hidden="true" className="project-artwork-placeholder">
            <span className="placeholder-frame"><i /><i /><i /><b /><em /></span>
            <span className="placeholder-index">{kind === 'mobile' ? 'APP' : 'WEB'} / 0{index + 1}</span>
          </div>}
      <span aria-hidden="true" className="project-artwork-tint" />
      {!project.image && kind === 'mobile' && <span className="project-artwork-label">Project imagery<br />coming soon</span>}
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

  return (
    <article className="mobile-stack-card" key={project.id} style={style}>
      <ProjectArtwork index={index} kind="mobile" project={project} />
      <div className="mobile-stack-copy">
        <p className="project-card-kicker">Mobile applications <span>/</span> 0{index + 1}</p>
        <h3 className="font-cinzel">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <span className="project-preview-note">{project.note}</span>
      </div>
    </article>
  );
}

function MobileWorkSection() {
  return (
    <section aria-labelledby="mobile-work-title" className="mobile-work-section">
      <div className="portfolio-section-heading">
        <div><p className="portfolio-section-kicker">01 <span>/</span> Mobile</p><h3 className="font-cinzel" id="mobile-work-title">Apps made for real life.</h3></div>
        <p>Scroll to move through the stack.</p>
      </div>
      <div className="mobile-stack-track">
        {MOBILE_PROJECTS.map((project, index) => <MobileProjectCard index={index} key={project.id} project={project} />)}
      </div>
    </section>
  );
}

function WebsiteWorkSection() {
  const { sectionRef, trackRef } = useHorizontalWorkFacade();
  const { selection, dialogRef, openViewer, closeViewer } = useWebsiteViewerFacade();

  return (
    <>
      <section aria-labelledby="website-work-title" className="website-work-section" ref={sectionRef}>
        <div className="website-work-stage">
          <div className="website-work-heading">
            <div><p className="portfolio-section-kicker">02 <span>/</span> Websites</p><h3 className="font-cinzel" id="website-work-title">A wider canvas.</h3></div>
            <p>Keep scrolling to move across the work <span aria-hidden="true">→</span></p>
          </div>
          <div aria-label="Website project previews" className="website-work-window" role="region" tabIndex={0}>
            <div className="website-work-track" ref={trackRef}>
              {WEBSITE_PROJECTS.map((project, index) => (
                <a
                  aria-label={`Open ${project.title} in the website viewer`}
                  className="website-project-card"
                  href="https://www.youtube.com/"
                  aria-haspopup="dialog"
                  key={project.id}
                  onClick={event => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    openViewer({ title: project.title, url: 'https://www.youtube.com/embed/M7lc1UVf-VE?rel=0' }, event.currentTarget);
                  }}
                  rel="noreferrer"
                  style={{ '--project-index': index } as ProjectStyle}
                  target="_blank"
                >
                  <ProjectArtwork index={index} kind="website" project={project} />
                  <div className="website-project-copy">
                    <span className="project-card-kicker">Websites <span>/</span> 0{index + 1}</span>
                    <h4 className="font-cinzel">{project.title}</h4>
                    <p>{project.description}</p>
                    <span className="project-preview-note">{project.note}</span>
                    <span className="website-project-open">Open preview <b aria-hidden="true">↗</b></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="website-work-progress"><span /></div>
          <span className="website-work-counter" aria-hidden="true">Scroll / <b>03</b></span>
        </div>
      </section>
      <dialog
        aria-label={selection ? `Website viewer: ${selection.title}` : 'Website viewer'}
        className="website-viewer-dialog"
        onClick={event => {
          if (event.target === event.currentTarget) closeViewer();
        }}
        ref={dialogRef}
      >
        <div className="website-viewer-shell">
          <header className="website-viewer-toolbar">
            <div className="website-viewer-title"><span aria-hidden="true" className="website-viewer-signal" /><div><b>{selection?.title ?? 'Website preview'}</b><span>{selection?.url ?? 'https://www.youtube.com/'}</span></div></div>
            <div className="website-viewer-actions">
              {selection && <a href={selection.url} rel="noreferrer" target="_blank">Open in new tab <span aria-hidden="true">↗</span></a>}
              <button aria-label="Close website viewer" className="website-viewer-close" onClick={closeViewer} type="button">×</button>
            </div>
          </header>
          {selection && <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="website-viewer-frame" referrerPolicy="strict-origin-when-cross-origin" src={selection.url} title={`Website preview: ${selection.title}`} />}
          <p className="website-viewer-fallback">If this preview does not load, <a href="https://www.youtube.com/" rel="noreferrer" target="_blank">open YouTube in a new tab</a>.</p>
        </div>
      </dialog>
    </>
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
      {index === 0 && <h3 className="portfolio-section-kicker" id="case-studies-title">03 <span>/</span> Case studies</h3>}
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
        <p className="selected-work-kicker">Selected work <span>/</span> 01—03</p>
        <h2 className="font-cinzel" id="selected-work-title">A practice across platforms.</h2>
        <p className="selected-work-summary">Mobile products, web experiences, and research into how people move through digital worlds.</p>
      </header>
      <MobileWorkSection />
      <WebsiteWorkSection />
      <section aria-labelledby="case-studies-title" className="case-studies-list">
        {CASE_STUDIES.map((project, index) => <CaseStudyFeature index={index} key={project.id} project={project} />)}
      </section>
    </section>
  );
}
