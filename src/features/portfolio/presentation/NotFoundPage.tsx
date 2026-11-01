import type { CSSProperties } from 'react';
import DotGrid from '../../../core/ui/DotGrid';
import { brightenColor, type ColorPalette } from '../domain/colorPalettes';
import { CustomCursor } from './CustomCursor';
import { useHeroTitleFacade } from './useHeroTitleFacade';

interface NotFoundPageProps {
  readonly palette: ColorPalette;
}

type NotFoundStyle = CSSProperties & {
  '--page': string;
  '--surface': string;
  '--primary': string;
  '--button-text': string;
  '--secondary': string;
  '--text': string;
  '--muted': string;
};

export function NotFoundPage({ palette }: NotFoundPageProps) {
  const { titleRef, handlePointerMove, resetPosition } = useHeroTitleFacade();
  const style: NotFoundStyle = {
    '--page': palette.colors.page,
    '--surface': palette.colors.surface,
    '--primary': palette.colors.primary,
    '--button-text': palette.colors.primaryForeground,
    '--secondary': palette.colors.secondary,
    '--text': palette.colors.text,
    '--muted': palette.colors.muted,
  };

  return (
    <main className="retro-page not-found-page" style={style}>
      <div aria-hidden="true" className="not-found-grid">
        <DotGrid
          activeColor={brightenColor(palette.colors.primary, 0.4)}
          baseColor={palette.colors.text}
          clickShock
          dotSize={3}
          enabled
          gap={25}
          opacity={0.78}
          proximity={140}
          strength={0.8}
        />
      </div>
      <div className="not-found-content">
        <p className="not-found-kicker"><span aria-hidden="true" /> Signal lost / 404</p>
        <h1
          aria-label="404"
          className="not-found-code hero-title"
          onPointerLeave={resetPosition}
          onPointerMove={handlePointerMove}
          ref={titleRef}
        >
          {Array.from('404').map((digit, index) => <span aria-hidden="true" className="hero-title__char" key={`${digit}-${index}`}>{digit}</span>)}
        </h1>
        <div className="not-found-rule" aria-hidden="true"><span /></div>
        <h2 className="not-found-heading font-cinzel">This page has drifted off course.</h2>
        <p className="not-found-copy">The address may have changed, or the page may no longer be here. Let’s get you back to the main signal.</p>
        <a className="not-found-home retro-button" href="/">
          <span>Return home</span><span aria-hidden="true">↗</span>
        </a>
        <p className="not-found-coordinate" aria-hidden="true">Sushant Neupane <span>/</span> Portfolio</p>
      </div>
      <CustomCursor />
    </main>
  );
}
