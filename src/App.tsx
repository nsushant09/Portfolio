import type { CSSProperties } from 'react';
import resumeUrl from './assets/Sushant_Resume.pdf';
import DotGrid from './core/ui/DotGrid';
import { CASE_STUDIES } from './features/portfolio/domain/selectedWork';
import { BottomNavigation } from './features/portfolio/presentation/BottomNavigation';
import { CaseStudyPage } from './features/portfolio/presentation/CaseStudyPage';
import { CustomCursor } from './features/portfolio/presentation/CustomCursor';
import { PortfolioIntro } from './features/portfolio/presentation/PortfolioIntro';
import { NotFoundPage } from './features/portfolio/presentation/NotFoundPage';
import { SelectedWork } from './features/portfolio/presentation/SelectedWork';
import { ExperienceTimeline } from './features/portfolio/presentation/ExperienceTimeline';
import { AboutSection } from './features/portfolio/presentation/AboutSection';
import { PortfolioFooter } from './features/portfolio/presentation/PortfolioFooter';
import { ThemePullSwitch } from './features/portfolio/presentation/ThemePullSwitch';
import { useNavigationFacade } from './features/portfolio/presentation/useNavigationFacade';
import { useIntroFacade } from './features/portfolio/presentation/useIntroFacade';
import { useColorPaletteFacade } from './features/portfolio/presentation/useColorPaletteFacade';
import { useHeroTitleFacade } from './features/portfolio/presentation/useHeroTitleFacade';
import { useScrollHapticsFacade } from './features/portfolio/presentation/useScrollHapticsFacade';
import { BlogPage } from './features/blog/BlogPage';

type PaletteStyle = CSSProperties & {
  '--page': string;
  '--surface': string;
  '--primary': string;
  '--button-text': string;
  '--secondary': string;
  '--text': string;
  '--muted': string;
};

function titleCharacters(text: string) {
  return Array.from(text).map((character, index) => (
    <span aria-hidden="true" className="hero-title__char" key={`${character}-${index}`}>{character === ' ' ? '\u00a0' : character}</span>
  ));
}

function App() {
  const paletteState = useColorPaletteFacade();
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const selectedCaseStudy = CASE_STUDIES.find(project => currentPath === `/work/${project.id}`);

  if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
    return <BlogPage path={currentPath} palette={paletteState.activePalette} />;
  }

  if (selectedCaseStudy) {
    return <CaseStudyPage isLightMode={paletteState.isLightMode} onToggleLighting={paletteState.toggleLighting} palette={paletteState.activePalette} project={selectedCaseStudy} />;
  }
  if (currentPath !== '/' && currentPath !== '/index.html') {
    return <NotFoundPage palette={paletteState.activePalette} />;
  }

  return <PortfolioHome paletteState={paletteState} />;
}

interface PortfolioHomeProps {
  readonly paletteState: ReturnType<typeof useColorPaletteFacade>;
}

function PortfolioHome({ paletteState }: PortfolioHomeProps) {
  const { activePalette, isLightMode, toggleLighting } = paletteState;
  const { isHomeVisible, isIntroVisible } = useIntroFacade();
  const { activeSection, isMenuOpen, isNavigationVisible, menuButtonRef, closeMenu, toggleMenu } = useNavigationFacade(isHomeVisible);
  const { titleRef, handlePointerEnter, handlePointerMove, resetPosition } = useHeroTitleFacade();
  const { contentRef } = useScrollHapticsFacade();
  const themeStyle: PaletteStyle = {
    '--page': activePalette.colors.page,
    '--surface': activePalette.colors.surface,
    '--primary': activePalette.colors.primary,
    '--button-text': activePalette.colors.primaryForeground,
    '--secondary': activePalette.colors.secondary,
    '--text': activePalette.colors.text,
    '--muted': activePalette.colors.muted,
  };

  return (
    <main className="retro-page min-h-screen overflow-x-clip bg-[var(--page)] text-[var(--text)] transition-colors duration-500" style={themeStyle}>
      <PortfolioIntro visible={isIntroVisible} />
      <div className={`retro-shell mx-auto w-full max-w-7xl px-4 sm:px-8 ${isHomeVisible ? 'retro-shell--ready' : ''}`} inert={!isHomeVisible || isMenuOpen}>
        <div className={`home-content ${isHomeVisible ? 'home-content--visible' : ''}`} aria-hidden={!isHomeVisible} inert={!isHomeVisible} ref={contentRef}>
          <section aria-labelledby="hero-title" className="hero-fullscreen" id="top">
            <ThemePullSwitch isLightMode={isLightMode} onToggle={toggleLighting} />
            <div aria-hidden="true" className="hero-dot-grid">
              {isHomeVisible && <DotGrid
                activeColor={activePalette.colors.primary}
                baseColor={activePalette.colors.text}
                clickShock
                dotSize={3}
                enabled={isHomeVisible}
                gap={25}
                opacity={0.82}
                proximity={150}
                strength={0.75}
              />}
            </div>
            <div className="hero-content">
              <h1 aria-label="From first principles to production." className="hero-title" id="hero-title" onPointerEnter={handlePointerEnter} onPointerLeave={resetPosition} onPointerMove={handlePointerMove} ref={titleRef}><span aria-hidden="true" className="hero-title__line">{titleCharacters('From first')}</span><span aria-hidden="true" className="hero-title__line">{titleCharacters('principles to')}</span><span aria-hidden="true" className="hero-title__line font-cinzel">{titleCharacters('production.')}</span></h1>
              <p className="hero-description" id="about">I engineer mobile applications and the resilient services behind them, carrying considered ideas from architecture through deployment and into the hands of their users.</p>
              <div className="hero-actions">
                <a className="retro-button hero-primary-action" href="#selected-work">Explore selected work <span aria-hidden="true">↘</span></a>
                <a className="hero-secondary-action" href={resumeUrl} rel="noreferrer" target="_blank">Read my resume <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-specialties" aria-label="Specialties">
                <span>Mobile Development</span><span>Cloud Engineering</span><span>DevOps &amp; Delivery</span>
              </div>
            </div>
          </section>

          <section aria-label="Digital product design, development, and delivery capabilities" className="capability-marquee" id="expertise">
            <p className="sr-only">Web Design, UI and UX Audits, Web and Mobile Development, Cloud Infrastructure, DevOps and Delivery, and Applied Research.</p>
            <div aria-hidden="true" className="capability-track">
              <span>Web Design <b>✳</b> UI / UX Audits <b>✳</b> Web &amp; Mobile Development <b>✳</b> Cloud Infrastructure <b>✳</b> DevOps &amp; Delivery <b>✳</b> Applied Research <b>✳</b></span>
              <span>Web Design <b>✳</b> UI / UX Audits <b>✳</b> Web &amp; Mobile Development <b>✳</b> Cloud Infrastructure <b>✳</b> DevOps &amp; Delivery <b>✳</b> Applied Research <b>✳</b></span>
            </div>
          </section>

          <SelectedWork />
          <ExperienceTimeline />
          <AboutSection />
          <PortfolioFooter resumeHref={resumeUrl} />
        </div>
      </div>
      <BottomNavigation
        activeSection={activeSection}
        isOpen={isMenuOpen}
        isVisible={isNavigationVisible}
        menuButtonRef={menuButtonRef}
        onClose={closeMenu}
        onToggle={toggleMenu}
        resumeHref={resumeUrl}
      />
      <CustomCursor />
    </main>
  );
}

export default App;
