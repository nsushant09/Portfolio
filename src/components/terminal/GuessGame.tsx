import React, { useState, useRef } from 'react';
import { playBeep, playSuccessSound, playErrorSound } from '../../utils/audio';
import { Target, RotateCcw } from 'lucide-react';

export const GuessGame: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guessInput, setGuessInput] = useState('');
  const [guesses, setGuesses] = useState<{ num: number; hint: 'higher' | 'lower' | 'correct' }[]>([]);
  const [isWon, setIsWon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guessInput.trim(), 10);
    if (isNaN(num) || num < 1 || num > 100) {
      playErrorSound();
      return;
    }

    if (num === targetNumber) {
      playSuccessSound();
      setGuesses(prev => [...prev, { num, hint: 'correct' }]);
      setIsWon(true);
    } else if (num < targetNumber) {
      playBeep(400, 0.04, 'sine');
      setGuesses(prev => [...prev, { num, hint: 'higher' }]);
    } else {
      playBeep(300, 0.04, 'sine');
      setGuesses(prev => [...prev, { num, hint: 'lower' }]);
    }

    setGuessInput('');
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuesses([]);
    setIsWon(false);
    setGuessInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="my-2 max-w-sm font-mono text-xs space-y-2 select-none">
      <div className="flex justify-between items-center pb-1 border-b border-[var(--border)]/40">
        <span className="font-bold text-sm text-[var(--accent)] flex items-center gap-1.5">
          <Target size={14} /> NUMBER GUESS (1-100)
        </span>
        <span className="text-[11px] text-[var(--muted)]">Attempts: {guesses.length}</span>
      </div>

      <p className="text-[var(--fg)] opacity-90 text-[11px]">
        The terminal has picked a secret number between <strong>1 and 100</strong>. Can you binary-search it?
      </p>

      {/* Guesses Log */}
      {guesses.length > 0 && (
        <div className="p-2 bg-black/40 border border-[var(--border)] rounded max-h-32 overflow-y-auto space-y-1">
          {guesses.map((g, idx) => (
            <div key={idx} className="flex justify-between items-center text-[11px]">
              <span>Guess #{idx + 1}: <strong className="text-[var(--fg)]">{g.num}</strong></span>
              <span className={`font-bold ${
                g.hint === 'correct' ? 'text-[var(--accent-2)]' : g.hint === 'higher' ? 'text-[var(--warning)]' : 'text-[var(--accent)]'
              }`}>
                {g.hint === 'correct' ? '🎯 BINGO! CORRECT' : g.hint === 'higher' ? '▲ GO HIGHER' : '▼ GO LOWER'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      {!isWon ? (
        <form onSubmit={handleGuess} className="flex gap-2">
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={100}
            value={guessInput}
            onChange={e => setGuessInput(e.target.value)}
            placeholder="Enter number..."
            autoFocus
            className="flex-1 px-2.5 py-1.5 bg-black/50 border border-[var(--border)] rounded text-[var(--fg)] text-xs focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-[var(--accent)] text-[var(--bg)] font-bold rounded hover:opacity-90 transition-all cursor-pointer"
          >
            Guess
          </button>
        </form>
      ) : (
        <div className="p-2.5 bg-[var(--accent-2)]/10 border border-[var(--accent-2)] text-[var(--accent-2)] rounded text-center font-bold">
          🎉 Solved in {guesses.length} attempts!
        </div>
      )}

      {/* Footer controls */}
      <div className="flex justify-between items-center pt-1 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
        <span>Enter a number & hit Enter</span>
        <div className="flex gap-2">
          <button
            onClick={resetGame}
            className="px-2 py-0.5 bg-[var(--highlight)] text-[var(--fg)] hover:text-[var(--accent)] border border-[var(--border)] rounded flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={10} /> Play Again
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="px-2 py-0.5 border border-[var(--border)] hover:border-[var(--error)] text-[var(--error)] rounded cursor-pointer"
            >
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
