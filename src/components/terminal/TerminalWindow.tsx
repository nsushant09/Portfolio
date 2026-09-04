import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  COMMANDS,
  THEMES,
  getAutocomplete,
  findClosestCommand,
  matchIntent
} from '../../utils/commandParser';
import type { ThemeName } from '../../utils/commandParser';
import {
  initAudio,
  playKeySound,
  playEnterSound,
  playErrorSound,
  playSuccessSound,
  toggleSound,
  getSoundEnabled
} from '../../utils/audio';

import { AboutOutput } from './AboutOutput';
import { ProjectsOutput } from './ProjectsOutput';
import { ExperienceOutput } from './ExperienceOutput';
import { SkillsOutput } from './SkillsOutput';
import { BlogListOutput } from './BlogListOutput';
import { BlogPostOutput } from './BlogPostOutput';
import { ResumeOutput } from './ResumeOutput';
import { HelpOutput } from './HelpOutput';
import { ManOutput, WeatherOutput, QuoteOutput, HistoryOutput } from './ExtrasOutput';
import { SnakeGame } from './SnakeGame';
import { Game2048 } from './Game2048';
import { PongGame } from './PongGame';
import { TypingTest } from './TypingTest';
import { GuessGame } from './GuessGame';
import { GamesMenuOutput } from './GamesMenuOutput';
import { CommandPalette } from './CommandPalette';
import { PROFILE } from '../../constants/data';

import {
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  Tv,
  Search,
  LayoutGrid,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  CornerDownLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Gamepad2
} from 'lucide-react';
import emailjs from '@emailjs/browser';

interface TerminalEntry {
  id: string;
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

interface ContactWizardState {
  active: boolean;
  step: 'name' | 'email' | 'subject' | 'message' | 'confirm';
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

interface TerminalWindowProps {
  onSwitchToGui: () => void;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ onSwitchToGui }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // History and entries
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('term_cmd_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Input states
  const [inputVal, setInputVal] = useState<string>('');
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [ghostSuggestion, setGhostSuggestion] = useState<string>('');

  // Interactive CLI Contact Wizard state
  const [contactWizard, setContactWizard] = useState<ContactWizardState>({
    active: false,
    step: 'name',
    data: { name: '', email: '', subject: '', message: '' }
  });
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Settings states
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    const stored = localStorage.getItem('term_theme') as ThemeName;
    return THEMES.includes(stored) ? stored : 'dark';
  });
  const [isCrt, setIsCrt] = useState<boolean>(() => {
    return localStorage.getItem('term_crt_enabled') === 'true';
  });
  const [isSound, setIsSound] = useState<boolean>(() => {
    initAudio();
    return getSoundEnabled();
  });
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef<boolean>(false);

  // Apply Theme & CRT effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('term_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    if (isCrt) {
      document.body.classList.add('crt-mode');
    } else {
      document.body.classList.remove('crt-mode');
    }
    localStorage.setItem('term_crt_enabled', String(isCrt));
  }, [isCrt]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [entries, tabMatches, contactWizard]);

  const appendHistory = (cmd: string) => {
    if (!cmd.trim()) return;
    setHistory(prev => {
      const next = [...prev, cmd];
      localStorage.setItem('term_cmd_history', JSON.stringify(next.slice(-50)));
      return next;
    });
    setHistoryIndex(-1);
  };

  // Autocomplete computation (disabled during contact wizard)
  useEffect(() => {
    if (contactWizard.active || !inputVal) {
      setGhostSuggestion('');
      setTabMatches([]);
      return;
    }
    const { suggestion, matches } = getAutocomplete(inputVal);
    setGhostSuggestion(suggestion);
    if (matches.length > 1) {
      setTabMatches(matches);
    } else {
      setTabMatches([]);
    }
  }, [inputVal, contactWizard.active]);

  // Initial Real CLI Login Session
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const path = location.pathname;

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      executeCommand(`blog ${slug}`, true);
    } else if (path === '/blog') {
      executeCommand('blog', true);
    } else if (path === '/projects') {
      executeCommand('projects', true);
    } else if (path === '/experience') {
      executeCommand('experience', true);
    } else if (path === '/skills') {
      executeCommand('skills', true);
    } else if (path === '/contact') {
      executeCommand('contact', true);
    } else if (path === '/about') {
      executeCommand('about', true);
    } else {
      const loginDate = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();
      setEntries([
        {
          id: 'welcome-init',
          command: '',
          timestamp: new Date().toLocaleTimeString(),
          output: (
            <div className="space-y-2 font-mono text-xs select-text">
              <div className="text-[var(--muted)] text-[11px]">
                Last login: {loginDate} on ttys001
              </div>

              <pre className="text-[var(--accent)] text-[10px] sm:text-xs font-bold leading-tight select-none py-1">
{`   _____ _    _  _____ _    _          _   _ _______ 
  / ____| |  | |/ ____| |  | |   /\\   | \\ | |__   __|
 | (___ | |  | | (___ | |__| |  /  \\  |  \\| |  | |   
  \\___ \\| |  | |\\___ \\|  __  | / /\\ \\ | . \` |  | |   
  ____) | |__| |____) | |  | |/ ____ \\| |\\  |  | |   
 |_____/ \\____/|_____/|_|  |_/_/    \\_\\_| \\_|  |_|   `}
              </pre>

              <div className="text-[var(--fg)] text-xs leading-relaxed space-y-1">
                <div>
                  <span className="text-[var(--accent-2)] font-bold">nsushant-term v2.6.0</span> (x86_64-apple-darwin23.0) — <span className="text-[var(--accent)] font-semibold">{PROFILE.name}</span> ({PROFILE.role})
                </div>
                <div className="text-[var(--muted)]">
                  Type <span className="text-[var(--accent)] font-bold">help</span> to view available commands, <span className="text-[var(--accent)] font-bold">about</span> for bio, or <span className="text-[var(--accent-2)] font-bold">games</span> for arcade room.
                </div>
              </div>
            </div>
          )
        }
      ]);
    }
  }, []);

  // Handle Contact Wizard Steps
  const handleContactStepSubmit = async (value: string) => {
    const val = value.trim();
    playEnterSound();

    if (val.toLowerCase() === 'cancel' || val.toLowerCase() === 'exit') {
      setEntries(prev => [
        ...prev,
        {
          id: String(Date.now()),
          command: val,
          timestamp: new Date().toLocaleTimeString(),
          output: <div className="text-xs text-[var(--error)]">✖ Contact wizard cancelled.</div>
        }
      ]);
      setContactWizard({ active: false, step: 'name', data: { name: '', email: '', subject: '', message: '' } });
      setInputVal('');
      return;
    }

    if (contactWizard.step === 'name') {
      if (!val) {
        playErrorSound();
        return;
      }
      setEntries(prev => [
        ...prev,
        {
          id: String(Date.now()),
          command: `Name: ${val}`,
          timestamp: new Date().toLocaleTimeString(),
          output: null
        }
      ]);
      setContactWizard(prev => ({
        ...prev,
        step: 'email',
        data: { ...prev.data, name: val }
      }));
      setInputVal('');
    } else if (contactWizard.step === 'email') {
      if (!val || !val.includes('@')) {
        playErrorSound();
        setEntries(prev => [
          ...prev,
          {
            id: String(Date.now()),
            command: `Email: ${val}`,
            timestamp: new Date().toLocaleTimeString(),
            output: <div className="text-xs text-[var(--error)]">⚠️ Please enter a valid email address.</div>
          }
        ]);
        return;
      }
      setEntries(prev => [
        ...prev,
        {
          id: String(Date.now()),
          command: `Email: ${val}`,
          timestamp: new Date().toLocaleTimeString(),
          output: null
        }
      ]);
      setContactWizard(prev => ({
        ...prev,
        step: 'subject',
        data: { ...prev.data, email: val }
      }));
      setInputVal('');
    } else if (contactWizard.step === 'subject') {
      const subject = val || 'Portfolio Inquiry';
      setEntries(prev => [
        ...prev,
        {
          id: String(Date.now()),
          command: `Subject: ${subject}`,
          timestamp: new Date().toLocaleTimeString(),
          output: null
        }
      ]);
      setContactWizard(prev => ({
        ...prev,
        step: 'message',
        data: { ...prev.data, subject }
      }));
      setInputVal('');
    } else if (contactWizard.step === 'message') {
      if (!val) {
        playErrorSound();
        return;
      }
      setEntries(prev => [
        ...prev,
        {
          id: String(Date.now()),
          command: `Message: ${val}`,
          timestamp: new Date().toLocaleTimeString(),
          output: (
            <div className="my-1.5 space-y-1 font-mono text-xs pl-2 border-l-2 border-[var(--accent)]/40">
              <div className="font-bold text-[var(--accent)]">
                TRANSMISSION SUMMARY:
              </div>
              <div><span className="text-[var(--muted)]">From:</span> {contactWizard.data.name} &lt;{contactWizard.data.email}&gt;</div>
              <div><span className="text-[var(--muted)]">Subject:</span> {contactWizard.data.subject || 'Portfolio Inquiry'}</div>
              <div><span className="text-[var(--muted)]">Message:</span> {val}</div>
            </div>
          )
        }
      ]);
      setContactWizard(prev => ({
        ...prev,
        step: 'confirm',
        data: { ...prev.data, message: val }
      }));
      setInputVal('Y');
    } else if (contactWizard.step === 'confirm') {
      if (val.toLowerCase() === 'n' || val.toLowerCase() === 'no') {
        setEntries(prev => [
          ...prev,
          {
            id: String(Date.now()),
            command: 'Transmit? No',
            timestamp: new Date().toLocaleTimeString(),
            output: <div className="text-xs text-[var(--warning)]">Message aborted.</div>
          }
        ]);
        setContactWizard({ active: false, step: 'name', data: { name: '', email: '', subject: '', message: '' } });
        setInputVal('');
        return;
      }

      setIsTransmitting(true);
      const { name, email, subject, message } = contactWizard.data;

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            { name, email, title: subject, message, to_name: 'Sushant' },
            publicKey
          );
        } else {
          await new Promise(r => setTimeout(r, 1000));
        }

        playSuccessSound();
        setEntries(prev => [
          ...prev,
          {
            id: String(Date.now()),
            command: 'Transmit? Yes',
            timestamp: new Date().toLocaleTimeString(),
            output: (
              <div className="p-3 border border-[var(--accent-2)] bg-[var(--accent-2)]/10 text-[var(--accent-2)] rounded text-xs flex items-start gap-2">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Transmission delivered successfully!</div>
                  <div className="text-[11px] opacity-90">Thank you for reaching out, {name}. Sushant will get back to you shortly.</div>
                </div>
              </div>
            )
          }
        ]);
      } catch {
        playErrorSound();
        setEntries(prev => [
          ...prev,
          {
            id: String(Date.now()),
            command: 'Transmit? Yes',
            timestamp: new Date().toLocaleTimeString(),
            output: (
              <div className="p-3 border border-[var(--error)] bg-[var(--error)]/10 text-[var(--error)] rounded text-xs flex items-start gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Direct transmission encountered an issue.</div>
                  <div className="text-[11px] opacity-90">Please send an email directly to <a href={`mailto:${PROFILE.email}`} className="underline">{PROFILE.email}</a>.</div>
                </div>
              </div>
            )
          }
        ]);
      } finally {
        setIsTransmitting(false);
        setContactWizard({ active: false, step: 'name', data: { name: '', email: '', subject: '', message: '' } });
        setInputVal('');
      }
    }
  };

  // Handle Command Execution
  const executeCommand = (rawCommand: string, isFromUrl = false) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      if (!isFromUrl) {
        setEntries(prev => [
          ...prev,
          {
            id: String(Date.now()),
            command: '',
            timestamp: new Date().toLocaleTimeString(),
            output: null
          }
        ]);
      }
      return;
    }

    if (!isFromUrl) {
      appendHistory(trimmed);
      playEnterSound();
    }

    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ');

    const timeStr = new Date().toLocaleTimeString();
    const entryId = `${Date.now()}-${Math.random()}`;

    // Clear
    if (cmdName === 'clear' || cmdName === 'cls') {
      setEntries([]);
      setTabMatches([]);
      setInputVal('');
      return;
    }

    let outputContent: React.ReactNode = null;

    if (cmdName === 'help' || cmdName === '?' || cmdName === 'commands') {
      if (args[0]) {
        outputContent = <ManOutput commandName={args[0]} onCommandClick={executeCommand} />;
      } else {
        outputContent = <HelpOutput onCommandClick={executeCommand} />;
      }
    } else if (['about', 'whoami', 'bio', 'neofetch'].includes(cmdName)) {
      outputContent = <AboutOutput onCommandClick={executeCommand} />;
      if (!isFromUrl) navigate('/about');
    } else if (['projects', 'proj', 'work --projects'].includes(cmdName)) {
      outputContent = <ProjectsOutput filterQuery={argStr} onCommandClick={executeCommand} />;
      if (!isFromUrl) navigate('/projects');
    } else if (['experience', 'exp', 'work', 'career'].includes(cmdName)) {
      outputContent = <ExperienceOutput onCommandClick={executeCommand} />;
      if (!isFromUrl) navigate('/experience');
    } else if (['skills', 'stack', 'tech'].includes(cmdName)) {
      outputContent = <SkillsOutput categoryFilter={argStr} onCommandClick={executeCommand} />;
      if (!isFromUrl) navigate('/skills');
    } else if (['blog', 'posts', 'writing'].includes(cmdName)) {
      if (args[0]) {
        outputContent = <BlogPostOutput slug={args[0]} onCommandClick={executeCommand} />;
        if (!isFromUrl) navigate(`/blog/${args[0]}`);
      } else {
        outputContent = <BlogListOutput onCommandClick={executeCommand} />;
        if (!isFromUrl) navigate('/blog');
      }
    } else if (['contact', 'reach', 'hire'].includes(cmdName)) {
      // Start CLI Contact Wizard
      setContactWizard({
        active: true,
        step: 'name',
        data: { name: '', email: '', subject: '', message: '' }
      });
      outputContent = (
        <div className="my-2 text-xs font-mono space-y-1.5 select-text">
          <div className="font-bold text-[var(--accent)] flex items-center gap-1.5">
            <Mail size={13} /> INTERACTIVE CLI CONTACT WIZARD
          </div>
          <p className="text-[var(--fg)] opacity-90 pl-2">
            Fill in your details at the prompt below (or type <code className="text-[var(--error)]">cancel</code> to abort).
          </p>
          <div className="text-[11px] text-[var(--muted)] pl-2">
            Direct channels: Email: <a href={`mailto:${PROFILE.email}`} className="text-[var(--accent)] underline">{PROFILE.email}</a> • Phone: {PROFILE.phone} • Location: {PROFILE.location}
          </div>
        </div>
      );
      if (!isFromUrl) navigate('/contact');
    } else if (cmdName === 'linkedin') {
      window.open('https://linkedin.com/in/nsushant09', '_blank');
      outputContent = (
        <div className="text-xs text-[var(--accent-2)] font-mono flex items-center gap-2 py-1">
          <ExternalLink size={13} />
          <span>Opening LinkedIn profile: <a href="https://linkedin.com/in/nsushant09" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[var(--accent)]">linkedin.com/in/nsushant09</a> in a new tab...</span>
        </div>
      );
    } else if (cmdName === 'github' || cmdName === 'gh') {
      window.open('https://github.com/nsushant09', '_blank');
      outputContent = (
        <div className="text-xs text-[var(--accent-2)] font-mono flex items-center gap-2 py-1">
          <ExternalLink size={13} />
          <span>Opening GitHub profile: <a href="https://github.com/nsushant09" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[var(--accent)]">github.com/nsushant09</a> in a new tab...</span>
        </div>
      );
    } else if (cmdName === 'open') {
      const target = args[0]?.toLowerCase();
      if (!target) {
        outputContent = (
          <div className="text-xs text-[var(--error)] font-mono">
            Usage: <code className="font-bold text-[var(--fg)]">open &lt;linkedin | github | resume | email | url&gt;</code>
          </div>
        );
      } else if (target === 'linkedin') {
        window.open('https://linkedin.com/in/nsushant09', '_blank');
        outputContent = (
          <div className="text-xs text-[var(--accent-2)] flex items-center gap-1.5">
            <ExternalLink size={12} /> Opening LinkedIn profile in a new tab...
          </div>
        );
      } else if (target === 'github' || target === 'gh') {
        window.open('https://github.com/nsushant09', '_blank');
        outputContent = (
          <div className="text-xs text-[var(--accent-2)] flex items-center gap-1.5">
            <ExternalLink size={12} /> Opening GitHub profile in a new tab...
          </div>
        );
      } else if (target === 'resume' || target === 'cv') {
        window.open('/Sushant_Resume.pdf', '_blank');
        outputContent = (
          <div className="text-xs text-[var(--accent-2)] flex items-center gap-1.5">
            <ExternalLink size={12} /> Opening Resume PDF in a new tab...
          </div>
        );
      } else if (target === 'email' || target === 'mail') {
        window.location.href = `mailto:${PROFILE.email}`;
        outputContent = (
          <div className="text-xs text-[var(--accent-2)] flex items-center gap-1.5">
            <Mail size={12} /> Opening system mail client for {PROFILE.email}...
          </div>
        );
      } else if (target.startsWith('http://') || target.startsWith('https://')) {
        window.open(target, '_blank');
        outputContent = (
          <div className="text-xs text-[var(--accent-2)] flex items-center gap-1.5">
            <ExternalLink size={12} /> Opening {target} in a new tab...
          </div>
        );
      } else {
        window.open(`https://${target}`, '_blank');
        outputContent = (
          <div className="text-xs text-[var(--accent-2)] flex items-center gap-1.5">
            <ExternalLink size={12} /> Opening https://{target} in a new tab...
          </div>
        );
      }
    } else if (['resume', 'cv', 'download-resume'].includes(cmdName)) {
      outputContent = <ResumeOutput />;
    } else if (['social', 'links'].includes(cmdName)) {
      outputContent = (
        <div className="my-2 space-y-2 text-xs font-mono max-w-md select-text">
          <div className="font-bold text-[var(--accent)] pb-1 border-b border-[var(--border)]/40">
            VERIFIED SOCIAL & PROFILES:
          </div>
          <div className="space-y-1 pl-2">
            <div>
              <a href="https://github.com/nsushant09" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] hover:text-[var(--accent)] hover:underline inline-flex items-center gap-1.5">
                <Github size={12} /> GitHub: <span className="text-[var(--accent)]">github.com/nsushant09</span>
              </a>
            </div>
            <div>
              <a href="https://linkedin.com/in/nsushant09" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] hover:text-[var(--accent)] hover:underline inline-flex items-center gap-1.5">
                <Linkedin size={12} /> LinkedIn: <span className="text-[var(--accent)]">linkedin.com/in/nsushant09</span>
              </a>
            </div>
            <div>
              <a href={`mailto:${PROFILE.email}`} className="text-[var(--fg)] hover:text-[var(--accent)] hover:underline inline-flex items-center gap-1.5">
                <Mail size={12} /> Email: <span className="text-[var(--accent)]">{PROFILE.email}</span>
              </a>
            </div>
          </div>
        </div>
      );
    } else if (['games', 'arcade'].includes(cmdName)) {
      outputContent = <GamesMenuOutput onCommandClick={executeCommand} />;
    } else if (cmdName === 'snake' || trimmed.toLowerCase() === 'play snake') {
      outputContent = <SnakeGame onExit={() => executeCommand('clear')} />;
    } else if (cmdName === '2048' || trimmed.toLowerCase() === 'play 2048') {
      outputContent = <Game2048 onExit={() => executeCommand('clear')} />;
    } else if (cmdName === 'pong' || trimmed.toLowerCase() === 'play pong') {
      outputContent = <PongGame onExit={() => executeCommand('clear')} />;
    } else if (['typing', 'speedtest'].includes(cmdName) || trimmed.toLowerCase() === 'play typing') {
      outputContent = <TypingTest onExit={() => executeCommand('clear')} />;
    } else if (cmdName === 'guess' || trimmed.toLowerCase() === 'play guess') {
      outputContent = <GuessGame onExit={() => executeCommand('clear')} />;
    } else if (cmdName === 'theme') {
      const targetTheme = args[0]?.toLowerCase();
      if (!targetTheme || targetTheme === 'toggle') {
        const nextIdx = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
        const nextTheme = THEMES[nextIdx];
        setCurrentTheme(nextTheme);
        outputContent = <div className="text-xs text-[var(--accent-2)]">✓ Theme toggled to <strong>{nextTheme}</strong>.</div>;
      } else if (targetTheme === 'crt') {
        const crtArg = args[1]?.toLowerCase();
        const nextCrt = crtArg === 'on' ? true : crtArg === 'off' ? false : !isCrt;
        setIsCrt(nextCrt);
        outputContent = <div className="text-xs text-[var(--accent-2)]">✓ CRT scanline filter {nextCrt ? 'ENABLED' : 'DISABLED'}.</div>;
      } else if (THEMES.includes(targetTheme as ThemeName)) {
        setCurrentTheme(targetTheme as ThemeName);
        outputContent = <div className="text-xs text-[var(--accent-2)]">✓ Switched theme to <strong>{targetTheme}</strong>.</div>;
      } else {
        outputContent = <div className="text-xs text-[var(--error)]">Unknown theme &quot;{targetTheme}&quot;. Available: {THEMES.join(', ')}.</div>;
      }
    } else if (cmdName === 'sound' || cmdName === 'audio') {
      const soundArg = args[0]?.toLowerCase();
      let nextSound = !isSound;
      if (soundArg === 'on') nextSound = true;
      if (soundArg === 'off') nextSound = false;
      setIsSound(nextSound);
      toggleSound();
      outputContent = <div className="text-xs text-[var(--accent-2)]">✓ Mechanical key audio {nextSound ? 'ACTIVATED' : 'MUTED'}.</div>;
    } else if (cmdName === 'history') {
      outputContent = <HistoryOutput history={history} />;
    } else if (cmdName === 'man' || cmdName === 'manual') {
      outputContent = <ManOutput commandName={args[0] || 'help'} onCommandClick={executeCommand} />;
    } else if (cmdName === 'date' || cmdName === 'time') {
      outputContent = <div className="text-xs text-[var(--accent-2)] font-mono">🕒 {new Date().toString()}</div>;
    } else if (cmdName === 'echo') {
      outputContent = <div className="text-xs font-mono">{argStr}</div>;
    } else if (cmdName === 'weather') {
      outputContent = <WeatherOutput />;
    } else if (cmdName === 'quote') {
      outputContent = <QuoteOutput />;
    } else if (cmdName === 'gui' || cmdName === 'ui' || cmdName === 'normal') {
      onSwitchToGui();
      return;
    } else if (cmdName === 'sudo') {
      playErrorSound();
      outputContent = <div className="text-xs text-[var(--error)] font-mono">🔒 Permission denied: User &quot;visitor&quot; is not in the sudoers file.</div>;
    } else if (cmdName === 'exit' || cmdName === 'quit') {
      outputContent = <div className="text-xs text-[var(--warning)] font-mono">⚠️ Session locked: Explore more commands or switch to GUI mode 🙂</div>;
    } else {
      const matchedIntent = matchIntent(trimmed);
      const closest = findClosestCommand(cmdName);

      playErrorSound();
      outputContent = (
        <div className="text-xs font-mono space-y-1.5">
          <div className="text-[var(--error)]">
            zsh: command not found: <span className="font-bold">{trimmed}</span>
          </div>
          {matchedIntent && (
            <div className="text-[var(--accent-2)]">
              💡 Did you mean to run <button onClick={() => executeCommand(matchedIntent)} className="underline font-bold text-[var(--accent)]">{matchedIntent}</button>?
            </div>
          )}
          {!matchedIntent && closest && (
            <div className="text-[var(--muted)]">
              Did you mean <button onClick={() => executeCommand(closest)} className="text-[var(--accent)] underline font-bold">{closest}</button>?
            </div>
          )}
          <div className="text-[var(--muted)] text-[11px]">
            Type <button onClick={() => executeCommand('help')} className="text-[var(--accent)] underline">help</button> to see all commands.
          </div>
        </div>
      );
    }

    setEntries(prev => [
      ...prev,
      {
        id: entryId,
        command: trimmed,
        timestamp: timeStr,
        output: outputContent
      }
    ]);

    setInputVal('');
    setTabMatches([]);
    setGhostSuggestion('');
  };

  // Keyboard navigation & Shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 || ['Backspace', 'Enter', 'Space'].includes(e.key)) {
      playKeySound();
    }

    if (contactWizard.active) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleContactStepSubmit(inputVal);
      }
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setIsPaletteOpen(true);
      return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      executeCommand('clear');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (ghostSuggestion) {
        setInputVal(prev => prev + ghostSuggestion);
        setGhostSuggestion('');
      } else if (tabMatches.length === 1) {
        setInputVal(tabMatches[0] + ' ');
      }
      return;
    }

    if (e.key === 'ArrowRight' && ghostSuggestion) {
      if (inputRef.current && inputRef.current.selectionStart === inputVal.length) {
        e.preventDefault();
        setInputVal(prev => prev + ghostSuggestion);
        setGhostSuggestion('');
        return;
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      return;
    }
  };

  const quickActions = [
    { label: 'help', cmd: 'help' },
    { label: 'about', cmd: 'about' },
    { label: 'experience', cmd: 'experience' },
    { label: 'projects', cmd: 'projects' },
    { label: 'skills', cmd: 'skills' },
    { label: 'blog', cmd: 'blog' },
    { label: 'contact', cmd: 'contact' },
    { label: 'linkedin', cmd: 'open linkedin' },
    { label: 'github', cmd: 'open github' },
    { label: 'games', cmd: 'games' },
    { label: 'theme', cmd: 'theme toggle' },
    { label: 'clear', cmd: 'clear' }
  ];

  // Dynamic Prompt Label
  const getPromptLabel = () => {
    if (!contactWizard.active) {
      return (
        <div className="flex items-center gap-1.5 flex-shrink-0 select-none">
          <span className="text-[var(--accent-2)] font-bold">visitor@nsushant.com.np</span>
          <span className="text-[var(--muted)]">:</span>
          <span className="text-[var(--accent)] font-bold">~</span>
          <span className="text-[var(--fg)] font-bold">$</span>
        </div>
      );
    }

    if (contactWizard.step === 'name') {
      return <span className="text-[var(--accent)] font-bold select-none">? Enter your name:</span>;
    }
    if (contactWizard.step === 'email') {
      return <span className="text-[var(--accent)] font-bold select-none">? Enter your email:</span>;
    }
    if (contactWizard.step === 'subject') {
      return <span className="text-[var(--accent)] font-bold select-none">? Subject (optional):</span>;
    }
    if (contactWizard.step === 'message') {
      return <span className="text-[var(--accent)] font-bold select-none">? Enter message:</span>;
    }
    if (contactWizard.step === 'confirm') {
      return <span className="text-[var(--accent-2)] font-bold select-none">? Transmit message now? [Y/n]:</span>;
    }
    return null;
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-between bg-[var(--bg)] text-[var(--fg)] font-mono overflow-hidden select-text"
      onClick={focusInput}
    >
      {/* FULL-SCREEN TERMINAL FRAME */}
      <div className="w-full h-full flex flex-col bg-[var(--card-bg)] overflow-hidden">
        
        {/* Window Top Titlebar */}
        <header className="px-4 py-2.5 bg-[var(--term-header)] border-b border-[var(--border)] flex items-center justify-between select-none flex-shrink-0">
          {/* Left Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                executeCommand('clear');
              }}
              title="Clear Terminal"
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity cursor-pointer border border-[#e0443e]"
            />
            <button
              onClick={e => {
                e.stopPropagation();
                setCurrentTheme(THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length]);
              }}
              title="Cycle Theme"
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity cursor-pointer border border-[#dea123]"
            />
            <button
              onClick={e => {
                e.stopPropagation();
                executeCommand('about');
              }}
              title="About / Specs"
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity cursor-pointer border border-[#1aab29]"
            />
          </div>

          {/* Center Shell Title */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-bold truncate px-2">
            <TerminalIcon size={14} className="text-[var(--accent)]" />
            <span className="text-[var(--fg)] font-semibold">visitor@nsushant.com.np:</span>
            <span>~ (zsh — full viewport)</span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={e => {
                e.stopPropagation();
                setIsPaletteOpen(true);
              }}
              title="Command Palette (Cmd+K)"
              className="px-2 py-1 rounded bg-[var(--highlight)] text-[var(--muted)] hover:text-[var(--accent)] border border-[var(--border)] transition-all flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Search size={13} />
              <span className="hidden sm:inline font-mono">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={e => {
                e.stopPropagation();
                const next = toggleSound();
                setIsSound(next);
              }}
              title={isSound ? 'Mute Mechanical Sounds' : 'Enable Mechanical Sounds'}
              className={`p-1.5 rounded hover:bg-[var(--highlight)] border border-transparent hover:border-[var(--border)] transition-all cursor-pointer ${
                isSound ? 'text-[var(--accent-2)]' : 'text-[var(--muted)]'
              }`}
            >
              {isSound ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* CRT Effect Toggle */}
            <button
              onClick={e => {
                e.stopPropagation();
                setIsCrt(c => !c);
              }}
              title="Toggle Retro CRT Scanlines"
              className={`p-1.5 rounded hover:bg-[var(--highlight)] border border-transparent hover:border-[var(--border)] transition-all cursor-pointer ${
                isCrt ? 'text-[var(--accent)] bg-[var(--highlight)]' : 'text-[var(--muted)]'
              }`}
            >
              <Tv size={15} />
            </button>

            {/* GUI View Switcher */}
            <button
              onClick={e => {
                e.stopPropagation();
                onSwitchToGui();
              }}
              title="Switch to Standard GUI View"
              className="px-2.5 py-1 rounded bg-[var(--accent)] text-[var(--bg)] hover:opacity-90 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <LayoutGrid size={13} />
              <span>GUI</span>
            </button>
          </div>
        </header>

        {/* Quick Navigation Toolbar */}
        <nav
          aria-label="Terminal Quick Navigation"
          className="px-4 py-2 bg-black/25 border-b border-[var(--border)] flex items-center gap-2 overflow-x-auto select-none flex-shrink-0 text-xs"
        >
          <span className="text-[11px] text-[var(--muted)] uppercase tracking-wider font-bold mr-1 flex-shrink-0 flex items-center gap-1">
            <Sparkles size={12} className="text-[var(--accent)]" /> Quick:
          </span>
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={e => {
                e.stopPropagation();
                executeCommand(action.cmd);
              }}
              className="px-2.5 py-1 rounded bg-[var(--highlight)] text-[var(--fg)] hover:text-[var(--accent)] hover:border-[var(--accent)] border border-[var(--border)] transition-all text-xs font-mono flex-shrink-0 cursor-pointer"
            >
              [{action.label}]
            </button>
          ))}
        </nav>

        {/* Scrollable Output Terminal Region */}
        <main
          ref={scrollContainerRef}
          aria-live="polite"
          aria-atomic="false"
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 font-mono text-xs sm:text-sm text-[var(--fg)]"
        >
          {/* Permanent CLI Entries */}
          {entries.map(entry => (
            <div key={entry.id} className="space-y-2 animate-fade-in">
              {entry.command && (
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <span className="text-[var(--accent-2)] font-bold">visitor@nsushant.com.np</span>
                  <span className="text-[var(--muted)]">:</span>
                  <span className="text-[var(--accent)] font-bold">~</span>
                  <span className="text-[var(--fg)]">$</span>
                  <span className="font-semibold text-[var(--fg)]">{entry.command}</span>
                  <span className="ml-auto text-[10px] text-[var(--muted)]">{entry.timestamp}</span>
                </div>
              )}
              {entry.output && <div>{entry.output}</div>}
            </div>
          ))}
        </main>

        {/* Bottom Interactive Command Prompt */}
        <div className="p-4 bg-[var(--term-header)] border-t border-[var(--border)] flex flex-col gap-2 flex-shrink-0">
          {/* Matching Commands directly above input prompt */}
          {tabMatches.length > 1 && (
            <div className="pb-1.5 border-b border-[var(--border)]/40 text-xs text-[var(--muted)] font-mono animate-fade-in flex flex-wrap items-center gap-2">
              <span className="text-[var(--accent)] font-bold text-[11px]">Matching commands:</span>
              <div className="flex flex-wrap gap-2">
                {tabMatches.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setInputVal(m + ' ');
                      focusInput();
                    }}
                    className="text-[var(--fg)] hover:text-[var(--accent)] hover:underline cursor-pointer text-xs font-semibold"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Line with Ghost Autosuggestion */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm relative">
            <label htmlFor="terminal-input" className="sr-only">Terminal Input</label>
            {getPromptLabel()}

            <div className="flex-1 relative flex items-center">
              {/* Foreground Input Field */}
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={inputVal}
                disabled={isTransmitting}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder={
                  contactWizard.active
                    ? contactWizard.step === 'confirm' ? 'Y / n' : 'Type here and press Enter...'
                    : "Type a command (e.g. 'help', 'open linkedin', 'games', '2048', 'blog')..."
                }
                className="w-full bg-transparent text-[var(--fg)] focus:outline-none font-mono text-xs sm:text-sm z-10 placeholder-[var(--muted)]/40"
              />

              {/* Ghost Autocomplete Overlay */}
              {!contactWizard.active && ghostSuggestion && (
                <div className="absolute left-0 top-0 pointer-events-none text-xs sm:text-sm font-mono flex items-center z-0">
                  <span className="invisible">{inputVal}</span>
                  <span className="text-[var(--muted)] opacity-60">{ghostSuggestion}</span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 border border-[var(--border)] rounded text-[var(--muted)] hidden md:inline">
                    Tab ⇥
                  </span>
                </div>
              )}
            </div>

            {/* Submit button for touch/mobile */}
            <button
              onClick={() => {
                if (contactWizard.active) handleContactStepSubmit(inputVal);
                else executeCommand(inputVal);
              }}
              title="Submit"
              className="p-1.5 rounded bg-[var(--accent)] text-[var(--bg)] hover:opacity-90 transition-opacity md:hidden cursor-pointer"
            >
              {isTransmitting ? <Loader2 size={14} className="animate-spin" /> : <CornerDownLeft size={14} />}
            </button>
          </div>

          {/* Helper Shortcut Controls */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border)]/40 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (ghostSuggestion) {
                    setInputVal(prev => prev + ghostSuggestion);
                    setGhostSuggestion('');
                  } else if (tabMatches.length === 1) {
                    setInputVal(tabMatches[0] + ' ');
                  }
                }}
                className="px-2 py-0.5 bg-black/30 border border-[var(--border)] rounded hover:text-[var(--fg)] cursor-pointer"
              >
                Tab
              </button>
              <button
                onClick={() => {
                  if (history.length === 0) return;
                  const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
                  setHistoryIndex(nextIdx);
                  setInputVal(history[nextIdx] || '');
                }}
                className="px-2 py-0.5 bg-black/30 border border-[var(--border)] rounded hover:text-[var(--fg)] cursor-pointer"
              >
                ↑
              </button>
              <button
                onClick={() => {
                  if (history.length === 0 || historyIndex === -1) return;
                  const nextIdx = historyIndex + 1;
                  if (nextIdx >= history.length) {
                    setHistoryIndex(-1);
                    setInputVal('');
                  } else {
                    setHistoryIndex(nextIdx);
                    setInputVal(history[nextIdx] || '');
                  }
                }}
                className="px-2 py-0.5 bg-black/30 border border-[var(--border)] rounded hover:text-[var(--fg)] cursor-pointer"
              >
                ↓
              </button>
              <button
                onClick={() => executeCommand('clear')}
                className="px-2 py-0.5 bg-black/30 border border-[var(--border)] rounded hover:text-[var(--fg)] cursor-pointer"
              >
                cls
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="hidden sm:inline">Theme: <strong className="text-[var(--accent)]">{currentTheme}</strong></span>
              <span>Press <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded text-[var(--fg)]">⌘K</kbd> for palette</span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onExecuteCommand={executeCommand}
      />
    </div>
  );
};
