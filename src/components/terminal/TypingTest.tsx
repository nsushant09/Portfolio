import React, { useState, useEffect, useRef } from 'react';
import { playKeySound, playSuccessSound, playErrorSound } from '../../utils/audio';
import { Zap, RefreshCw, Trophy } from 'lucide-react';

const SNIPPETS = [
  "val intent = Intent(context, MainActivity::class.java)",
  "const [state, setState] = useState<boolean>(true);",
  "docker run -d --name app-container -p 8080:8080 app:v2",
  "fun calculateLoss(predicted: Float, actual: Float): Float",
  "git checkout -b feature/interactive-terminal-portfolio",
  "mvn clean install -DskipTests && java -jar target/app.jar"
];

export const TypingTest: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [targetText, setTargetText] = useState(SNIPPETS[0]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [highWpm, setHighWpm] = useState<number>(() => {
    return parseInt(localStorage.getItem('term_typing_high_wpm') || '0', 10);
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const resetTest = () => {
    const nextIdx = (snippetIndex + 1) % SNIPPETS.length;
    setSnippetIndex(nextIdx);
    setTargetText(SNIPPETS[nextIdx]);
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    playKeySound();

    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(val);

    // Calculate accuracy
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) correctCount++;
    }
    const currentAcc = val.length > 0 ? Math.round((correctCount / val.length) * 100) : 100;
    setAccuracy(currentAcc);

    // Check completion
    if (val === targetText) {
      const durationMin = Math.max(0.01, (Date.now() - (startTime || Date.now())) / 60000);
      const words = targetText.length / 5;
      const finalWpm = Math.round(words / durationMin);

      setWpm(finalWpm);
      setIsCompleted(true);
      playSuccessSound();

      if (finalWpm > highWpm) {
        setHighWpm(finalWpm);
        localStorage.setItem('term_typing_high_wpm', String(finalWpm));
      }
    }
  };

  return (
    <div className="my-2 max-w-lg font-mono text-xs space-y-2 select-none">
      <div className="flex justify-between items-center pb-1 border-b border-[var(--border)]/40">
        <span className="font-bold text-sm text-[var(--accent)] flex items-center gap-1.5">
          <Zap size={14} /> TERMINAL SPEED TYPING TEST
        </span>
        <div className="flex items-center gap-3">
          <span>Best: <strong className="text-[var(--warning)]">{highWpm} WPM</strong></span>
        </div>
      </div>

      {/* Target Code Snippet Display */}
      <div className="p-3 bg-black/40 border border-[var(--border)] rounded text-sm select-none tracking-wide leading-relaxed font-mono">
        {targetText.split('').map((char, idx) => {
          let charClass = 'text-[var(--muted)] opacity-60';
          if (idx < userInput.length) {
            if (userInput[idx] === char) {
              charClass = 'text-[var(--accent-2)] font-bold';
            } else {
              charClass = 'text-[var(--error)] bg-[var(--error)]/20 font-bold';
            }
          }
          return <span key={idx} className={charClass}>{char}</span>;
        })}
      </div>

      {/* Input Field */}
      {!isCompleted ? (
        <div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Start typing the code snippet above..."
            autoFocus
            className="w-full px-3 py-2 bg-black/50 border border-[var(--accent)]/60 rounded text-[var(--fg)] text-xs font-mono focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      ) : (
        <div className="p-3 bg-[var(--accent-2)]/10 border border-[var(--accent-2)] rounded text-center space-y-1">
          <div className="text-base font-bold text-[var(--accent-2)] flex items-center justify-center gap-1.5">
            <Trophy size={16} /> Speed: {wpm} WPM | Accuracy: {accuracy}%
          </div>
          <div className="text-[11px] text-[var(--muted)]">
            {wpm >= highWpm ? '🔥 New High Score!' : 'Great pace!'}
          </div>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex justify-between items-center text-[11px] text-[var(--muted)] pt-1">
        <div className="flex gap-3">
          <span>Accuracy: <strong className="text-[var(--fg)]">{accuracy}%</strong></span>
          {startTime && !isCompleted && (
            <span>Time: <strong className="text-[var(--accent)]">{Math.round((Date.now() - startTime) / 1000)}s</strong></span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetTest}
            className="px-2.5 py-1 bg-[var(--highlight)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-[var(--accent)] font-bold border border-[var(--border)] rounded flex items-center gap-1 transition-all cursor-pointer"
          >
            <RefreshCw size={11} /> Next Snippet
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="px-2.5 py-1 border border-[var(--border)] hover:border-[var(--error)] text-[var(--error)] rounded transition-all cursor-pointer"
            >
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
