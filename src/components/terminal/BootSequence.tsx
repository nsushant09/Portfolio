import React, { useState, useEffect } from 'react';
import { playBeep, playKeySound } from '../../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "BIOS Version: NEUPANE-EFI v4.19 (x86_64-apple-darwin)",
  "CPU: Apple Silicon M-Series (12 cores) @ 3.49 GHz",
  "Memory: 32768 MB LPDDR5 [OK]",
  "Storage: 1TB NVMe PCIe 4.0 SSD [Mounted /dev/nvme0n1p1 at /]",
  "Initializing network interface en0... IP 192.168.1.104 [CONNECTED]",
  "Establishing secure TLS session with nsushant.com.np... [OK]",
  "Loading Android SDK, Kotlin Multiplatform & Compose runtime... [DONE]",
  "Mounting full-stack toolchains: React, TypeScript, Spring Boot, Docker... [DONE]",
  "Initializing terminal environment & autocomplete daemon... [READY]",
  "Welcome to Sushant Neupane's Portfolio Terminal v2.6.0",
  "System ready. Type 'help' or click quick actions below to begin."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (currentIdx < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, BOOT_LOGS[currentIdx]]);
        playKeySound();
        setCurrentIdx(c => c + 1);
      }, currentIdx === 0 ? 100 : 70);
      return () => clearTimeout(timer);
    } else {
      const endTimer = setTimeout(() => {
        playBeep(880, 0.08, 'sine');
        onComplete();
      }, 400);
      return () => clearTimeout(endTimer);
    }
  }, [currentIdx, onComplete]);

  // Allow skip on any keypress or click
  useEffect(() => {
    const handleSkip = () => {
      onComplete();
    };
    window.addEventListener('keydown', handleSkip);
    return () => window.removeEventListener('keydown', handleSkip);
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="p-4 font-mono text-xs text-[var(--fg)] space-y-1.5 cursor-pointer select-none animate-fade-in"
    >
      <pre className="text-[var(--accent)] text-[10px] sm:text-xs font-bold leading-none mb-3">
{`
   _____ _    _  _____ _    _          _   _ _______ 
  / ____| |  | |/ ____| |  | |   /\\   | \\ | |__   __|
 | (___ | |  | | (___ | |__| |  /  \\  |  \\| |  | |   
  \\___ \\| |  | |\\___ \\|  __  | / /\\ \\ | . \` |  | |   
  ____) | |__| |____) | |  | |/ ____ \\| |\\  |  | |   
 |_____/ \\____/|_____/|_|  |_/_/    \\_\\_| \\_|  |_|   
`}
      </pre>

      <div className="space-y-1 text-xs">
        {displayedLogs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-[var(--muted)]">[{`0.${(i * 123 + 45).toString().padStart(4, '0')}`}]</span>
            <span className={i === BOOT_LOGS.length - 1 ? 'text-[var(--accent-2)] font-bold' : ''}>
              {log}
            </span>
          </div>
        ))}
        {currentIdx < BOOT_LOGS.length && (
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <span className="terminal-cursor" />
          </div>
        )}
      </div>

      <div className="pt-4 text-[10px] text-[var(--muted)] flex justify-between items-center border-t border-[var(--border)] mt-4">
        <span>Press <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded text-[var(--fg)]">ANY KEY</kbd> or click to skip boot sequence</span>
        <span className="text-[var(--accent)]">Booting...</span>
      </div>
    </div>
  );
};
