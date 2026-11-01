import type { CSSProperties } from 'react';

interface PortfolioIntroProps {
  readonly visible: boolean;
}

export function PortfolioIntro({ visible }: PortfolioIntroProps) {
  const name = 'Sushant Neupane';

  return (
    <div
      aria-hidden={!visible}
      className={`portfolio-intro ${visible ? 'portfolio-intro--visible' : 'portfolio-intro--exit'}`}
      inert={!visible}
    >
      <div className="intro-copy">
        <h1 aria-label={name} className="intro-name font-cinzel">
          {Array.from(name).map((character, index) => {
            const style = { '--char-index': index } as CSSProperties;
            return (
              <span aria-hidden="true" className="intro-letter" key={`${character}-${index}`} style={style}>
                {character === ' ' ? '\u00a0' : character}
              </span>
            );
          })}
        </h1>
        <span aria-hidden="true" className="intro-rule" />
      </div>
    </div>
  );
}
