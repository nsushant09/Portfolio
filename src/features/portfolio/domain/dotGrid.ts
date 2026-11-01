import type { HexColor } from './colorPalettes';

export interface DotGridSettings {
  readonly activeColor: HexColor;
  readonly baseColor: HexColor;
  readonly clickShock: boolean;
  readonly dotSize: number;
  readonly enabled: boolean;
  readonly gap: number;
  readonly opacity: number;
  readonly proximity: number;
  readonly strength: number;
}
