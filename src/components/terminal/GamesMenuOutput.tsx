import React from 'react';

export const GamesMenuOutput: React.FC<{ onCommandClick?: (cmd: string) => void }> = ({ onCommandClick }) => {
  const games = [
    {
      name: 'Snake',
      command: 'snake',
      desc: 'Classic retro arcade snake with keyboard controls and score tracking.',
      icon: '🐍'
    },
    {
      name: '2048',
      command: '2048',
      desc: 'Slide tiles and merge numbers to reach the elusive 2048 tile.',
      icon: '🔢'
    },
    {
      name: 'Pong',
      command: 'pong',
      desc: 'Retro paddle rally vs computer AI. First to 5 points wins.',
      icon: '🏓'
    },
    {
      name: 'Speed Typing Test',
      command: 'typing',
      desc: 'Test your WPM typing speed and accuracy on real code snippets.',
      icon: '⚡'
    },
    {
      name: 'Number Guess',
      command: 'guess',
      desc: 'Binary search guess game: Find the secret number between 1 and 100.',
      icon: '🎯'
    }
  ];

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-3xl select-text">
      <div className="flex justify-between items-baseline pb-1 border-b border-[var(--border)]/40">
        <span className="text-[var(--accent)] font-bold">
          TERMINAL ARCADE ROOM ({games.length} games)
        </span>
        <span className="text-[10px] text-[var(--muted)]">Launch directly: &lt;game_name&gt;</span>
      </div>

      <div className="space-y-3 pl-1">
        {games.map((g, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-0.5">
            <div className="w-48 flex-shrink-0">
              <button
                onClick={() => onCommandClick?.(g.command)}
                className="text-[var(--accent)] font-bold hover:underline cursor-pointer text-left inline-block"
              >
                {g.icon} {g.command}
              </button>
            </div>
            <div className="text-[var(--fg)] opacity-90 text-[11px]">
              {g.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-[var(--muted)] pt-2 border-t border-[var(--border)]/40">
        Tip: Type any game name (e.g. <span className="text-[var(--accent)]">snake</span>, <span className="text-[var(--accent)]">2048</span>, <span className="text-[var(--accent)]">pong</span>) to play.
      </div>
    </div>
  );
};
