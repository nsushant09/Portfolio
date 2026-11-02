import { useEffect, useState } from 'react';
import {
  COLOR_PALETTES,
  contrastRatio,
  type ColorPaletteId,
} from '../domain/colorPalettes';

function initialPaletteId(): ColorPaletteId {
  if (typeof window === 'undefined') return 'combination-3';
  try {
    const storedPaletteId = window.localStorage.getItem('portfolio-palette');
    return COLOR_PALETTES.some(palette => palette.id === storedPaletteId)
      ? storedPaletteId as ColorPaletteId
      : 'combination-3';
  } catch {
    return 'combination-3';
  }
}

export function useColorPaletteFacade() {
  const [activePaletteId, setActivePaletteId] = useState<ColorPaletteId>(initialPaletteId);
  const activePalette = COLOR_PALETTES.find(palette => palette.id === activePaletteId) ?? COLOR_PALETTES[0];
  const isLightMode = activePaletteId === 'combination-5';

  useEffect(() => {
    try {
      window.localStorage.setItem('portfolio-palette', activePaletteId);
    } catch {
      // Keep the selected theme in memory when storage is unavailable.
    }
  }, [activePaletteId]);

  const toggleLighting = () => {
    setActivePaletteId(current => current === 'combination-5' ? 'combination-3' : 'combination-5');
  };

  return {
    palettes: COLOR_PALETTES,
    activePalette,
    isLightMode,
    toggleLighting,
    selectPalette: setActivePaletteId,
    primaryContrast: contrastRatio(activePalette.colors.primary, activePalette.colors.page),
    primaryForegroundContrast: contrastRatio(activePalette.colors.primaryForeground, activePalette.colors.primary),
    textContrast: contrastRatio(activePalette.colors.text, activePalette.colors.page),
  };
}
