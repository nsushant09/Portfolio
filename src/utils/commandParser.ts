import { BLOGS } from '../constants/blogData';
import { PROJECTS } from '../constants/data';

export interface CommandDef {
  name: string;
  aliases: string[];
  description: string;
  category: 'General' | 'Navigation' | 'System' | 'Fun';
  usage?: string;
  manual?: string;
}

export const THEMES = ['dark', 'light', 'matrix', 'dracula', 'nord', 'solarized'] as const;
export type ThemeName = typeof THEMES[number];

export const FONT_SIZES = ['sm', 'default', 'lg', 'xl', '2xl'] as const;
export type FontSizeName = typeof FONT_SIZES[number];

export const FONT_SIZE_INFO: Record<FontSizeName, { label: string; px: number; scale: string; desc: string }> = {
  sm: { label: 'Small', px: 13, scale: '85%', desc: 'Compact (13px / 85%)' },
  default: { label: 'Default', px: 15, scale: '100%', desc: 'Standard (15px / 100%)' },
  lg: { label: 'Large', px: 17, scale: '115%', desc: 'Comfortable (17px / 115%)' },
  xl: { label: 'Extra Large', px: 19, scale: '130%', desc: 'Spacious (19px / 130%)' },
  '2xl': { label: 'Huge', px: 22, scale: '150%', desc: 'Maximum (22px / 150%)' }
};

export const COMMANDS: CommandDef[] = [
  {
    name: 'help',
    aliases: ['?', 'commands'],
    description: 'Display all available terminal commands',
    category: 'General',
    usage: 'help [command]',
    manual: 'HELP - Displays reference information about terminal commands. Use "help [command]" or "man [command]" for details on a specific command.'
  },
  {
    name: 'about',
    aliases: ['whoami', 'bio', 'neofetch'],
    description: 'Show bio, profile summary & Neofetch system info',
    category: 'Navigation',
    usage: 'about',
    manual: 'ABOUT - Displays an ASCII art avatar and detailed system/career specifications for Sushant Neupane.'
  },
  {
    name: 'experience',
    aliases: ['exp', 'work', 'career'],
    description: 'View work & research timeline and roles',
    category: 'Navigation',
    usage: 'experience',
    manual: 'EXPERIENCE - Outlines commercial software engineering roles, research internships, and academic positions.'
  },
  {
    name: 'projects',
    aliases: ['proj', 'work --projects'],
    description: 'List and inspect featured engineering projects',
    category: 'Navigation',
    usage: 'projects [name | --all]',
    manual: 'PROJECTS - Displays high-impact engineering projects across Android, WebXR, ARCore, and Full-Stack systems. Specify a project slug to inspect details.'
  },
  {
    name: 'skills',
    aliases: ['stack', 'tech'],
    description: 'Show technical skills, languages & toolchains',
    category: 'Navigation',
    usage: 'skills [category]',
    manual: 'SKILLS - Categorized breakdown of programming languages, libraries, platforms, and DevOps tools.'
  },
  {
    name: 'blog',
    aliases: ['posts', 'writing'],
    description: 'Read technical articles & engineering writeups',
    category: 'Navigation',
    usage: 'blog [slug]',
    manual: 'BLOG - Lists technical posts on AI, Machine Learning, and Android, or renders the full markdown content of a specified article.'
  },
  {
    name: 'contact',
    aliases: ['reach', 'hire'],
    description: 'Interactive CLI message dispatcher & channels',
    category: 'Navigation',
    usage: 'contact',
    manual: 'CONTACT - Launches the interactive step-by-step terminal contact wizard to send a transmission.'
  },
  {
    name: 'open',
    aliases: [],
    description: 'Open external URLs or profiles (linkedin, github, resume, email)',
    category: 'Navigation',
    usage: 'open <linkedin | github | resume | email | url>',
    manual: 'OPEN - Opens external links such as LinkedIn, GitHub, Resume PDF, or any custom URL in a new browser tab.'
  },
  {
    name: 'linkedin',
    aliases: [],
    description: 'Open official LinkedIn profile in a new tab',
    category: 'Navigation',
    usage: 'linkedin',
    manual: 'LINKEDIN - Directly navigates to https://linkedin.com/in/nsushant09 in a new tab.'
  },
  {
    name: 'github',
    aliases: ['gh'],
    description: 'Open official GitHub profile in a new tab',
    category: 'Navigation',
    usage: 'github',
    manual: 'GITHUB - Directly navigates to https://github.com/nsushant09 in a new tab.'
  },
  {
    name: 'resume',
    aliases: ['cv', 'download-resume'],
    description: 'View or download official resume PDF',
    category: 'Navigation',
    usage: 'resume',
    manual: 'RESUME - Provides direct links to view and download the official PDF resume.'
  },
  {
    name: 'social',
    aliases: ['links'],
    description: 'List verified external profile channels',
    category: 'Navigation',
    usage: 'social',
    manual: 'SOCIAL - Lists links to GitHub, LinkedIn, and social profiles.'
  },
  {
    name: 'games',
    aliases: ['arcade', 'play'],
    description: 'Open the Terminal Arcade Room (Snake, 2048, Pong, Typing, Guess)',
    category: 'Fun',
    usage: 'games',
    manual: 'GAMES - Lists all interactive terminal arcade games with instant launch shortcuts.'
  },
  {
    name: 'snake',
    aliases: ['play snake'],
    description: 'Play retro terminal snake arcade game',
    category: 'Fun',
    usage: 'snake',
    manual: 'SNAKE - Launches real-time retro arcade snake directly in the terminal.'
  },
  {
    name: '2048',
    aliases: ['play 2048'],
    description: 'Play 2048 numbers puzzle in terminal',
    category: 'Fun',
    usage: '2048',
    manual: '2048 - Classic 4x4 sliding tile game.'
  },
  {
    name: 'pong',
    aliases: ['play pong'],
    description: 'Play retro Pong arcade game vs CPU AI',
    category: 'Fun',
    usage: 'pong',
    manual: 'PONG - Classic retro paddle rally game.'
  },
  {
    name: 'typing',
    aliases: ['speedtest', 'type'],
    description: 'Test your WPM typing speed on code snippets',
    category: 'Fun',
    usage: 'typing',
    manual: 'TYPING - Terminal speed typing test with real-time WPM and accuracy metrics.'
  },
  {
    name: 'guess',
    aliases: ['play guess'],
    description: 'Number guessing challenge (1-100)',
    category: 'Fun',
    usage: 'guess',
    manual: 'GUESS - Binary search secret number guessing game.'
  },
  {
    name: 'theme',
    aliases: ['colors'],
    description: 'Change color theme (dark, light, matrix, dracula, nord, solarized, crt)',
    category: 'System',
    usage: 'theme <dark|light|matrix|dracula|nord|solarized|toggle|crt [on|off]>',
    manual: 'THEME - Changes the terminal color palette. Available palettes: dark, light, matrix, dracula, nord, solarized. Also toggles CRT scanlines.'
  },
  {
    name: 'fontsize',
    aliases: ['font-size', 'font', 'zoom', 'size', 'text-size'],
    description: 'Adjust or increase terminal font size (sm, default, lg, xl, 2xl, +, -, reset)',
    category: 'System',
    usage: 'fontsize <sm|default|lg|xl|2xl|+|-|reset>',
    manual: 'FONTSIZE - Adjusts terminal typography size across the entire session. Supported values: sm (13px), default (15px), lg (17px), xl (19px), 2xl (22px), or relative (+ / - / reset).'
  },
  {
    name: 'sound',
    aliases: ['audio', 'sfx'],
    description: 'Toggle synthetic mechanical keyboard sound effects',
    category: 'System',
    usage: 'sound [on|off|toggle]',
    manual: 'SOUND - Configures mechanical key-clack audio feedback synthesized via Web Audio API.'
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear the terminal scrollback history (or Ctrl+L)',
    category: 'System',
    usage: 'clear',
    manual: 'CLEAR - Flushes all prior command entries and terminal outputs from the display.'
  },
  {
    name: 'history',
    aliases: [],
    description: 'Show session command history',
    category: 'System',
    usage: 'history',
    manual: 'HISTORY - Prints an indexed chronological list of commands executed in the current session.'
  },
  {
    name: 'man',
    aliases: ['manual'],
    description: 'Format and display the manual page for a command',
    category: 'General',
    usage: 'man <command>',
    manual: 'MAN - The system manual viewer. Provide a command name to read its comprehensive manual page.'
  },
  {
    name: 'date',
    aliases: ['time'],
    description: 'Print current date, time and timezone',
    category: 'General',
    usage: 'date',
    manual: 'DATE - Outputs the client local timestamp and UTC time.'
  },
  {
    name: 'echo',
    aliases: [],
    description: 'Print arguments to the terminal',
    category: 'General',
    usage: 'echo <text>',
    manual: 'ECHO - Repeats the supplied string arguments back into the terminal buffer.'
  },
  {
    name: 'weather',
    aliases: [],
    description: 'Simulate local ASCII terminal weather report',
    category: 'Fun',
    usage: 'weather',
    manual: 'WEATHER - Displays an ASCII visual weather forecast.'
  },
  {
    name: 'quote',
    aliases: [],
    description: 'Print an inspiring engineering/tech quote',
    category: 'Fun',
    usage: 'quote',
    manual: 'QUOTE - Prints a curated thought from computer science and engineering pioneers.'
  },
  {
    name: 'gui',
    aliases: ['ui', 'normal'],
    description: 'Switch between Terminal and standard GUI view',
    category: 'System',
    usage: 'gui',
    manual: 'GUI - Toggles the visual presentation between the terminal emulator and standard web layout.'
  },
  {
    name: 'sudo',
    aliases: [],
    description: 'Execute a command with superuser privileges',
    category: 'Fun',
    usage: 'sudo <command>',
    manual: 'SUDO - Execute a command as the superuser. Security policy enforced.'
  },
  {
    name: 'exit',
    aliases: ['quit'],
    description: 'Close the terminal session',
    category: 'Fun',
    usage: 'exit',
    manual: 'EXIT - Exits the shell (if it lets you!).'
  }
];

export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

export function findClosestCommand(input: string): string | null {
  const clean = input.trim().toLowerCase();
  if (!clean) return null;

  let closestCmd: string | null = null;
  let minDistance = 3;

  for (const cmd of COMMANDS) {
    const names = [cmd.name, ...cmd.aliases];
    for (const name of names) {
      const dist = levenshteinDistance(clean, name);
      if (dist < minDistance) {
        minDistance = dist;
        closestCmd = cmd.name;
      }
    }
  }

  return closestCmd;
}

export function matchIntent(input: string): string | null {
  const text = input.toLowerCase().trim();

  if (/(linkedin|profile|open linkedin)/.test(text)) return 'linkedin';
  if (/(github|git repo|open github)/.test(text)) return 'github';
  if (/(contact|email|message|reach|hire|touch|call|phone|talk)/.test(text)) return 'contact';
  if (/(who are you|whoami|about you|background|tell me about yourself|intro|bio)/.test(text)) return 'about';
  if (/(show.*projects|what have you built|portfolio|apps|work.*projects|projects)/.test(text)) return 'projects';
  if (/(experience|jobs|work.*history|career|companies|resume|cv)/.test(text)) {
    if (/(resume|cv|pdf)/.test(text)) return 'resume';
    return 'experience';
  }
  if (/(skills|stack|technologies|languages|what do you know|tools|frameworks)/.test(text)) return 'skills';
  if (/(articles|blogs|posts|reading|read|writeups)/.test(text)) return 'blog';
  if (/(games|arcade|play|game|snake|2048|pong|typing|guess)/.test(text)) {
    if (text.includes('2048')) return '2048';
    if (text.includes('pong')) return 'pong';
    if (text.includes('typing') || text.includes('speed')) return 'typing';
    if (text.includes('guess')) return 'guess';
    if (text.includes('snake')) return 'snake';
    return 'games';
  }
  if (/(theme|color|dark|light|matrix|style)/.test(text)) return 'theme';
  if (/(font.*size|fontsize|zoom|text.*size|bigger.*text|larger.*text|smaller.*text|increase.*font|decrease.*font)/.test(text)) return 'fontsize';
  if (/(clear|cls|wipe)/.test(text)) return 'clear';
  if (/(help|what can i do|commands|options|how to use)/.test(text)) return 'help';

  return null;
}

export interface AutocompleteResult {
  suggestion: string;
  matches: string[];
}

export function getAutocomplete(rawInput: string): AutocompleteResult {
  const trimmed = rawInput.trimStart();
  if (!trimmed) return { suggestion: '', matches: [] };

  const parts = trimmed.split(/\s+/);
  const isSecondArg = parts.length > 1 || (parts.length === 1 && rawInput.endsWith(' '));

  if (!isSecondArg) {
    const prefix = parts[0].toLowerCase();
    const allNames: string[] = [];
    COMMANDS.forEach(cmd => {
      allNames.push(cmd.name);
      cmd.aliases.forEach(a => {
        if (!a.includes(' ')) allNames.push(a);
      });
    });

    const uniqueNames = Array.from(new Set(allNames));
    const matches = uniqueNames.filter(name => name.startsWith(prefix)).sort();

    if (matches.length === 1) {
      return {
        suggestion: matches[0].slice(prefix.length),
        matches
      };
    } else if (matches.length > 1) {
      return {
        suggestion: '',
        matches
      };
    }
  } else {
    const cmdName = parts[0].toLowerCase();
    const argPrefix = parts[1] ? parts[1].toLowerCase() : '';

    if (cmdName === 'open') {
      const targets = ['linkedin', 'github', 'resume', 'email', 'website'];
      const matches = targets.filter(t => t.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }

    if (cmdName === 'theme') {
      const candidates = [...THEMES, 'crt', 'toggle'];
      const matches = candidates.filter(t => t.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }

    if (['fontsize', 'font-size', 'font', 'zoom', 'size', 'text-size'].includes(cmdName)) {
      const opts = ['sm', 'default', 'lg', 'xl', '2xl', '+', '-', 'increase', 'decrease', 'reset'];
      const matches = opts.filter(o => o.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }

    if (cmdName === 'blog') {
      const slugs = BLOGS.map(b => b.slug);
      const matches = slugs.filter(s => s.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }

    if (cmdName === 'projects') {
      const titles = PROJECTS.map(p => p.title.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, ''));
      const matches = titles.filter(t => t.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }

    if (cmdName === 'man' || cmdName === 'help') {
      const cmdNames = COMMANDS.map(c => c.name);
      const matches = cmdNames.filter(c => c.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }

    if (cmdName === 'sound') {
      const opts = ['on', 'off', 'toggle'];
      const matches = opts.filter(o => o.startsWith(argPrefix));
      return {
        suggestion: matches.length === 1 ? matches[0].slice(argPrefix.length) : '',
        matches
      };
    }
  }

  return { suggestion: '', matches: [] };
}
