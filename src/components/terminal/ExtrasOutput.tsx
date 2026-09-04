import React from 'react';
import { COMMANDS } from '../../utils/commandParser';
import type { CommandDef } from '../../utils/commandParser';

export const ManOutput: React.FC<{ commandName: string; onCommandClick?: (cmd: string) => void }> = ({ commandName, onCommandClick }) => {
  const cleanName = commandName.toLowerCase().trim();
  const cmd = COMMANDS.find(c => c.name === cleanName || c.aliases.includes(cleanName));

  if (!cmd) {
    return (
      <div className="my-1 text-xs font-mono text-[var(--error)]">
        No manual entry for &quot;{commandName}&quot;. Type <button onClick={() => onCommandClick?.('help')} className="text-[var(--accent)] underline cursor-pointer">help</button> for available commands.
      </div>
    );
  }

  return (
    <div className="my-2 text-xs font-mono space-y-2.5 max-w-3xl select-text leading-relaxed">
      <div className="text-[var(--accent)] font-bold">
        {cmd.name.toUpperCase()}(1) &mdash; General Commands Manual
      </div>

      <div>
        <div className="text-[var(--accent-2)] font-bold">NAME</div>
        <div className="pl-4 text-[var(--fg)]">{cmd.name} — {cmd.description}</div>
      </div>

      <div>
        <div className="text-[var(--accent-2)] font-bold">SYNOPSIS</div>
        <div className="pl-4 text-[var(--accent)] font-bold">{cmd.usage || cmd.name}</div>
      </div>

      <div>
        <div className="text-[var(--accent-2)] font-bold">DESCRIPTION</div>
        <div className="pl-4 text-[var(--fg)] opacity-90 leading-relaxed">{cmd.manual || cmd.description}</div>
      </div>

      {cmd.aliases.length > 0 && (
        <div>
          <div className="text-[var(--accent-2)] font-bold">ALIASES</div>
          <div className="pl-4 text-[var(--muted)]">{cmd.aliases.join(', ')}</div>
        </div>
      )}

      <div>
        <div className="text-[var(--accent-2)] font-bold">CATEGORY</div>
        <div className="pl-4 text-[var(--muted)]">{cmd.category}</div>
      </div>
    </div>
  );
};

export const WeatherOutput: React.FC = () => {
  return (
    <div className="my-2 text-xs font-mono space-y-1 select-text leading-relaxed">
      <div className="text-[var(--accent)] font-bold">
        WEATHER REPORT: Melbourne, VIC, Australia
      </div>
      <pre className="text-[var(--warning)] text-xs leading-none font-bold py-1 select-none">
{`   \\  /       
 _ /""\\ _     19°C / 66°F — Partly Cloudy
   \\__/       Wind: 14 km/h SW | Humidity: 58%
   /  \\       Barometer: 1014 hPa | UV Index: 3`}
      </pre>
    </div>
  );
};

export const QuoteOutput: React.FC = () => {
  const quotes = [
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" }
  ];
  const q = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="my-2 text-xs font-mono space-y-1 select-text leading-relaxed">
      <div className="text-[var(--accent-2)] font-bold"># QUOTE OF THE RUN:</div>
      <div className="text-[var(--fg)] italic pl-2">
        &ldquo;{q.text}&rdquo;
      </div>
      <div className="text-[var(--muted)] text-[11px] pl-2">— {q.author}</div>
    </div>
  );
};

export const HistoryOutput: React.FC<{ history: string[] }> = ({ history }) => {
  return (
    <div className="my-2 text-xs font-mono space-y-1 select-text leading-relaxed">
      <div className="text-[var(--accent)] font-bold">
        SESSION COMMAND HISTORY ({history.length} commands):
      </div>
      {history.length === 0 ? (
        <div className="text-[var(--muted)] pl-2">No commands executed in this session yet.</div>
      ) : (
        <div className="space-y-0.5 pl-2">
          {history.map((cmd, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-[var(--muted)] w-6 text-right select-none">{idx + 1}</span>
              <span className="text-[var(--fg)] font-semibold">{cmd}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
