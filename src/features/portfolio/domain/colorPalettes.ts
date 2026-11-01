export type HexColor = `#${string}`;

export interface ColorPalette {
  readonly id: 'combination-1' | 'combination-2' | 'combination-3' | 'combination-4' | 'combination-5';
  readonly name: string;
  readonly mood: string;
  readonly colors: {
    readonly page: HexColor;
    readonly surface: HexColor;
    readonly primary: HexColor;
    readonly primaryForeground: HexColor;
    readonly secondary: HexColor;
    readonly text: HexColor;
    readonly muted: HexColor;
  };
}

export const COLOR_PALETTES = [
  {
    id: 'combination-1',
    name: 'Combination 1',
    mood: 'Obsidian Black · Chrome Silver · Laser Crimson Red',
    colors: {
      page: '#080808',
      surface: '#171717',
      primary: '#D41514',
      primaryForeground: '#CDCBCA',
      secondary: '#CDCBCA',
      text: '#CDCBCA',
      muted: '#92908F',
    },
  },
  {
    id: 'combination-2',
    name: 'Combination 2',
    mood: 'Soft Peach · Lime Green · Crimson',
    colors: {
      page: '#F9EAD7',
      surface: '#FFF3E7',
      primary: '#BFE23A',
      primaryForeground: '#29251F',
      secondary: '#E10600',
      text: '#29251F',
      muted: '#71695F',
    },
  },
  {
    id: 'combination-3',
    name: 'Combination 3',
    mood: 'Charcoal Grey · Moonlit Silver · Signal Red',
    colors: {
      page: '#2A2A2A',
      surface: '#363636',
      primary: '#E10600',
      primaryForeground: '#FFFFFF',
      secondary: '#C0C0C0',
      text: '#C0C0C0',
      muted: '#999999',
    },
  },
  {
    id: 'combination-4',
    name: 'Combination 4',
    mood: 'Soft White · Sage Green · Deep Olive',
    colors: {
      page: '#e8e9df',
      surface: '#f2f3eb',
      primary: '#a9b887',
      primaryForeground: '#2e3d28',
      secondary: '#2e3d28',
      text: '#2e3d28',
      muted: '#5b6550',
    },
  },
  {
    id: 'combination-5',
    name: 'Combination 5',
    mood: 'Cosmic Latter · Mocha Cream · Deep Burgundy',
    colors: {
      page: '#e8dcc6',
      surface: '#f2eadb',
      primary: '#722f37',
      primaryForeground: '#e8dcc6',
      secondary: '#b7a89a',
      text: '#422b2d',
      muted: '#71645c',
    },
  },
] as const satisfies readonly ColorPalette[];

export type ColorPaletteId = (typeof COLOR_PALETTES)[number]['id'];

function relativeLuminance(hexColor: HexColor): number {
  const hex = hexColor.slice(1);
  if (!/^[\da-f]{6}$/i.test(hex)) {
    throw new RangeError(`Expected a six-digit hex color; received ${hexColor}.`);
  }

  const channels = [0, 2, 4].map(index => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const [red = 0, green = 0, blue = 0] = channels.map(channel =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

export function contrastRatio(foreground: HexColor, background: HexColor): number {
  const luminanceA = relativeLuminance(foreground);
  const luminanceB = relativeLuminance(background);
  const brightest = Math.max(luminanceA, luminanceB);
  const darkest = Math.min(luminanceA, luminanceB);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function brightenColor(color: HexColor, amount = 0.22): HexColor {
  const hex = color.slice(1);
  if (!/^[\da-f]{6}$/i.test(hex)) {
    throw new RangeError(`Expected a six-digit hex color; received ${color}.`);
  }

  const mix = Math.max(0, Math.min(1, amount));
  const channels = [0, 2, 4].map(index => Number.parseInt(hex.slice(index, index + 2), 16));
  const lighter = channels.map(channel => Math.round(channel + (255 - channel) * mix));
  return `#${lighter.map(channel => channel.toString(16).padStart(2, '0')).join('')}` as HexColor;
}
