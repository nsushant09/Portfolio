import { useEffect, useState } from 'react';
import {
  COLOR_PALETTES,
  type ColorPaletteId,
} from '../domain/colorPalettes';

const PALETTE_STORAGE_KEY = 'portfolio-palette-v2';
const LEGACY_PALETTE_STORAGE_KEY = 'portfolio-palette';
const DEFAULT_PALETTE_ID: ColorPaletteId = 'combination-5';

function initialPaletteId(): ColorPaletteId {
  if (typeof window === 'undefined') return DEFAULT_PALETTE_ID;
  try {
    const savedPaletteId = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    if (COLOR_PALETTES.some(palette => palette.id === savedPaletteId)) return savedPaletteId as ColorPaletteId;

    const legacyPaletteId = window.localStorage.getItem(LEGACY_PALETTE_STORAGE_KEY);
    if (COLOR_PALETTES.some(palette => palette.id === legacyPaletteId) && legacyPaletteId !== 'combination-3') {
      return legacyPaletteId as ColorPaletteId;
    }
    return DEFAULT_PALETTE_ID;
  } catch {
    return DEFAULT_PALETTE_ID;
  }
}

export function useColorPaletteFacade() {
  const [activePaletteId, setActivePaletteId] = useState<ColorPaletteId>(initialPaletteId);
  const activePalette = COLOR_PALETTES.find(palette => palette.id === activePaletteId) ?? COLOR_PALETTES[0];
  const isLightMode = activePaletteId === 'combination-5';

  useEffect(() => {
    try {
      window.localStorage.setItem(PALETTE_STORAGE_KEY, activePaletteId);
      window.localStorage.removeItem(LEGACY_PALETTE_STORAGE_KEY);
    } catch {
      // Keep the selected theme in memory when storage is unavailable.
    }
  }, [activePaletteId]);

  const toggleLighting = () => {
    setActivePaletteId(current => current === 'combination-5' ? 'combination-3' : 'combination-5');
  };

  return {
    activePalette,
    isLightMode,
    toggleLighting,
  };
}
