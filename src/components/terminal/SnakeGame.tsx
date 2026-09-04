import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playBeep, playErrorSound } from '../../utils/audio';

const GRID_WIDTH = 22;
const GRID_HEIGHT = 12;
const INITIAL_SNAKE = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export const SnakeGame: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 12, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('term_snake_highscore') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const generateFood = useCallback((currentSnake: { x: number; y: number }[]) => {
    while (true) {
      const x = Math.floor(Math.random() * GRID_WIDTH);
      const y = Math.floor(Math.random() * GRID_HEIGHT);
      if (!currentSnake.some(segment => segment.x === x && segment.y === y)) {
        return { x, y };
      }
    }
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood({ x: 12, y: 5 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        setIsPaused(prev => !prev);
        return;
      }

      if (gameOver) {
        if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') {
          resetGame();
        }
        return;
      }

      const currentDir = directionRef.current;
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && currentDir.y === 0) {
        setDirection({ x: 0, y: -1 });
      } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && currentDir.y === 0) {
        setDirection({ x: 0, y: 1 });
      } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && currentDir.x === 0) {
        setDirection({ x: -1, y: 0 });
      } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && currentDir.x === 0) {
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = {
          x: prevSnake[0].x + directionRef.current.x,
          y: prevSnake[0].y + directionRef.current.y
        };

        // Check boundary collision
        if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
          setGameOver(true);
          playErrorSound();
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          playErrorSound();
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          playBeep(880, 0.08, 'square');
          setScore(s => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('term_snake_highscore', String(nextScore));
            }
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [food, gameOver, isPaused, highScore, generateFood]);

  return (
    <div className="my-2 max-w-lg font-mono text-xs space-y-2 select-none">
      <div className="flex justify-between items-center pb-1 border-b border-[var(--border)]/40 text-xs">
        <span className="font-bold text-[var(--accent)]">🕹️ RETRO TERMINAL SNAKE</span>
        <div className="flex gap-4">
          <span>Score: <strong className="text-[var(--accent-2)]">{score}</strong></span>
          <span>Best: <strong className="text-[var(--warning)]">{highScore}</strong></span>
        </div>
      </div>

      <div
        className="grid gap-[1px] bg-black/40 border border-[var(--border)] p-1 rounded mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          width: '100%',
          aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`
        }}
      >
        {Array.from({ length: GRID_HEIGHT }).map((_, y) =>
          Array.from({ length: GRID_WIDTH }).map((_, x) => {
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            let cellClass = 'bg-transparent';
            if (isHead) cellClass = 'bg-[var(--accent)] rounded-[1px] shadow-[0_0_8px_var(--glow)]';
            else if (isBody) cellClass = 'bg-[var(--accent-2)] rounded-[1px] opacity-80';
            else if (isFood) cellClass = 'bg-[var(--error)] animate-pulse rounded-full';

            return <div key={`${x}-${y}`} className={`w-full h-full ${cellClass}`} />;
          })
        )}
      </div>

      <div className="mt-3 flex flex-wrap justify-between items-center text-xs text-[var(--muted)] gap-2">
        <span>Controls: <kbd className="px-1 border border-[var(--border)] rounded">WASD</kbd> or <kbd className="px-1 border border-[var(--border)] rounded">Arrows</kbd> | Pause: <kbd className="px-1 border border-[var(--border)] rounded">Space</kbd></span>
        <div className="flex gap-2">
          {gameOver ? (
            <button
              onClick={resetGame}
              className="px-2 py-1 bg-[var(--accent)] text-[var(--bg)] font-bold rounded hover:opacity-90 transition-opacity"
            >
              Play Again
            </button>
          ) : (
            <button
              onClick={() => setIsPaused(p => !p)}
              className="px-2 py-1 border border-[var(--border)] hover:border-[var(--accent)] rounded transition-colors"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
          {onExit && (
            <button
              onClick={onExit}
              className="px-2 py-1 border border-[var(--border)] hover:border-[var(--error)] text-[var(--error)] rounded transition-colors"
            >
              Exit
            </button>
          )}
        </div>
      </div>
      {gameOver && (
        <div className="mt-2 text-center text-[var(--error)] font-bold text-xs animate-bounce">
          💀 GAME OVER! Press [R] or click Play Again.
        </div>
      )}
    </div>
  );
};
