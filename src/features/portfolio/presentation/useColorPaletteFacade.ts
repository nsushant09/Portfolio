import { useState } from 'react';
import {
  COLOR_PALETTES,
  contrastRatio,
  type ColorPaletteId,
} from '../domain/colorPalettes';

export function useColorPaletteFacade() {
  const [activePaletteId, setActivePaletteId] = useState<ColorPaletteId>('combination-3');
  const activePalette = COLOR_PALETTES.find(palette => palette.id === activePaletteId) ?? COLOR_PALETTES[0];

  return {
    palettes: COLOR_PALETTES,
    activePalette,
    selectPalette: setActivePaletteId,
    primaryContrast: contrastRatio(activePalette.colors.primary, activePalette.colors.page),
    primaryForegroundContrast: contrastRatio(activePalette.colors.primaryForeground, activePalette.colors.primary),
    textContrast: contrastRatio(activePalette.colors.text, activePalette.colors.page),
  };
}
