import type { DotGridSettings } from '../../features/portfolio/domain/dotGrid';
import { useDotGridFacade } from '../../features/portfolio/presentation/useDotGridFacade';
import './DotGrid.css';

interface DotGridProps extends DotGridSettings {
  readonly className?: string;
}

function DotGrid({ className = '', ...settings }: DotGridProps) {
  const canvasRef = useDotGridFacade(settings);

  return (
    <div aria-hidden="true" className={`dot-grid ${className}`.trim()}>
      <canvas className="dot-grid__canvas" ref={canvasRef} />
    </div>
  );
}

export default DotGrid;
