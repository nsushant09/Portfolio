import type { RefObject } from 'react';
import type { ActiveNavigationSection } from './useNavigationFacade';

interface BottomNavigationProps {
  readonly activeSection: ActiveNavigationSection;
  readonly isOpen: boolean;
  readonly isVisible: boolean;
  readonly menuButtonRef: RefObject<HTMLButtonElement | null>;
  readonly resumeHref: string;
  readonly onClose: () => void;
  readonly onToggle: () => void;
}

export function BottomNavigation({
  activeSection,
  isOpen,
  isVisible,
  menuButtonRef,
  resumeHref,
  onClose,
  onToggle,
}: BottomNavigationProps) {
  return (
    <>
      {isOpen && <button aria-label="Close navigation menu" className="bottom-nav-backdrop" onClick={onClose} type="button" />}
      <div className={`bottom-navigation ${isVisible ? 'bottom-navigation--visible' : 'bottom-navigation--hidden'} ${isOpen ? 'bottom-navigation--open' : ''}`}>
        <section
          aria-hidden={!isOpen}
          aria-label="Portfolio navigation links"
          className={`bottom-nav-panel ${isOpen ? 'bottom-nav-panel--open' : ''}`}
          id="portfolio-navigation-panel"
          inert={!isOpen}
        >
          <div className="bottom-nav-panel-heading">
            <div><p className="bottom-nav-eyebrow">Take a look around</p><h2 className="font-cinzel">Sushant Neupane</h2></div>
            <button aria-label="Close navigation menu" className="bottom-nav-close" onClick={onClose} type="button">×</button>
          </div>
          <nav aria-label="Main navigation" className="bottom-nav-links">
            <a aria-current={activeSection === 'home' ? 'page' : undefined} href="#top" onClick={onClose}><span>Home</span><small>01</small></a>
            <a aria-current={activeSection === 'works' ? 'location' : undefined} href="#work" onClick={onClose}><span>Works</span><small>02</small></a>
            <a aria-current={activeSection === 'about' ? 'location' : undefined} href="#about" onClick={onClose}><span>About</span><small>03</small></a>
            <a href={resumeHref} onClick={onClose} rel="noreferrer" target="_blank"><span>Resume</span><small>↗</small></a>
            <a className="bottom-nav-booking" href="mailto:hello@sushantneupane.com?subject=Book%20a%20call" onClick={onClose}><span>Book a call</span><small>↗</small></a>
          </nav>
          <div className="bottom-nav-panel-footer"><span>Melbourne, Australia</span><a href="mailto:hello@sushantneupane.com">Send an email ↗</a></div>
        </section>

        <div className="bottom-nav-dock">
          <div className="bottom-nav-status"><span className="bottom-nav-status-dot" /><span>{activeSection}</span></div>
          <button
            aria-controls="portfolio-navigation-panel"
            aria-expanded={isOpen}
            className="bottom-nav-toggle"
            onClick={onToggle}
            ref={menuButtonRef}
            type="button"
          >
            <span>{isOpen ? 'Close menu' : 'Explore'}</span><span aria-hidden="true" className="bottom-nav-toggle-icon">{isOpen ? '×' : '↑'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
