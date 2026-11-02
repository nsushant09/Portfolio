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
import { ThemePullSwitch } from './features/portfolio/presentation/ThemePullSwitch';
import { useNavigationFacade } from './features/portfolio/presentation/useNavigationFacade';
import { useIntroFacade } from './features/portfolio/presentation/useIntroFacade';
import { useColorPaletteFacade } from './features/portfolio/presentation/useColorPaletteFacade';
import { useHeroTitleFacade } from './features/portfolio/presentation/useHeroTitleFacade';

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
  const { palettes, activePalette, isLightMode, toggleLighting, selectPalette, primaryContrast, primaryForegroundContrast, textContrast } = paletteState;
  const { isHomeVisible, isIntroVisible } = useIntroFacade();
  const { activeSection, isMenuOpen, isNavigationVisible, menuButtonRef, closeMenu, toggleMenu } = useNavigationFacade(isHomeVisible);
  const { titleRef, handlePointerMove, resetPosition } = useHeroTitleFacade();
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
        <div className={`home-content ${isHomeVisible ? 'home-content--visible' : ''}`} aria-hidden={!isHomeVisible} inert={!isHomeVisible}>
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
              <h1 aria-label="From first principles to production." className="hero-title" id="hero-title" onPointerLeave={resetPosition} onPointerMove={handlePointerMove} ref={titleRef}><span aria-hidden="true" className="hero-title__line">{titleCharacters('From first')}</span><span aria-hidden="true" className="hero-title__line">{titleCharacters('principles to')}</span><span aria-hidden="true" className="hero-title__line font-cinzel">{titleCharacters('production.')}</span></h1>
              <p className="hero-description" id="about">I engineer mobile applications and the resilient services behind them, carrying considered ideas from architecture through deployment and into the hands of their users.</p>
              <div className="hero-actions">
                <a className="retro-button hero-primary-action" href="#selected-work">Explore selected work <span aria-hidden="true">↘</span></a>
                <a className="hero-secondary-action" href={resumeUrl} rel="noreferrer" target="_blank">Read my resume <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-specialties" aria-label="Specialties">
                <span>Mobile Development</span><span>Cloud Engineering</span><span>DevOps &amp; Delivery</span>
              </div>
              <a className="hero-scroll-cue" href="#expertise"><span className="hero-scroll-line" /> Scroll to explore</a>
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

        <section className="py-9 sm:py-12" id="palettes" aria-labelledby="palette-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-[9px] font-bold uppercase text-[var(--muted)]">The color cabinet / 05 swatches</p><h2 id="palette-title" className="font-cinzel mt-1 text-2xl font-semibold sm:text-3xl">Choose your atmosphere</h2></div>
            <span className="border border-[var(--text)] px-3 py-1 text-[8px] font-bold uppercase">{activePalette.name} · selected</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {palettes.map((palette, index) => {
              const isSelected = palette.id === activePalette.id;
              return <button key={palette.id} type="button" aria-pressed={isSelected} onClick={() => selectPalette(palette.id)} className={`palette-tile group border-2 p-3 text-left transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${isSelected ? 'selected border-[var(--primary)] bg-[var(--surface)]' : 'border-[var(--text)]/35 bg-transparent hover:-translate-y-1 hover:border-[var(--primary)]'}`}>
                <span className="mb-3 flex items-center justify-between"><span className="font-cinzel text-xs font-bold">No. 0{index + 1}</span><span className="grid h-5 w-5 place-items-center rounded-full border border-[var(--text)] text-[10px]">{isSelected ? '✓' : '+'}</span></span>
                <span className="block text-[11px] font-bold">{palette.name}</span><span className="mt-1 block min-h-8 text-[8px] leading-relaxed text-[var(--muted)]">{palette.mood}</span>
                <span className="mt-3 flex gap-1" aria-label={`Colors: ${palette.mood}`}>{[palette.colors.page, palette.colors.primary, palette.colors.secondary, palette.colors.text].map((color, colorIndex) => <span key={`${color}-${colorIndex}`} aria-hidden="true" className="h-7 flex-1 border border-black/10" style={{ backgroundColor: color }} />)}</span>
              </button>;
            })}
          </div>
          <details className="contrast-details mt-5 border-t border-[var(--text)]/25 pt-3 text-[9px]">
            <summary className="cursor-pointer font-bold uppercase">Contrast notes <span className="ml-1 text-[var(--muted)]">— expand</span></summary>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[var(--muted)]"><span>Primary / page <b className="text-[var(--text)]">{primaryContrast.toFixed(1)}:1</b></span><span>CTA / primary <b className="text-[var(--text)]">{primaryForegroundContrast.toFixed(1)}:1</b></span><span>Body / page <b className="text-[var(--text)]">{textContrast.toFixed(1)}:1</b></span></div>
          </details>
        </section>

        <footer id="contact" className="flex flex-wrap items-end justify-between gap-4 border-t-2 border-[var(--text)] py-5">
          <div><p className="text-[8px] font-bold uppercase text-[var(--muted)]">Have a good one in mind?</p><a className="font-cinzel text-xl font-semibold" href="mailto:hello@sushantneupane.com">Let’s make it real <span className="text-[var(--primary)]">↗</span></a></div>
          <span className="text-[8px] font-bold uppercase">© Sushant Neupane · Made with intent</span>
        </footer>
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
