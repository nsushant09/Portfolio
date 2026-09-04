import React, { useState, useEffect, useRef } from 'react';
import { playBeep, playErrorSound, playSuccessSound } from '../../utils/audio';

const WIDTH = 36;
const HEIGHT = 14;
const PADDLE_HEIGHT = 3;

export const PongGame: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [playerY, setPlayerY] = useState(5);
  const [cpuY, setCpuY] = useState(5);
  const [ball, setBall] = useState({ x: 18, y: 7, dx: 1, dy: 1 });
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [winner, setWinner] = useState<'player' | 'cpu' | null>(null);

  const playerYRef = useRef(playerY);
  playerYRef.current = playerY;

  const resetBall = (direction: number) => {
    setBall({
      x: 18,
      y: 7,
      dx: direction,
      dy: Math.random() > 0.5 ? 1 : -1
    });
  };

  const resetGame = () => {
    setScore({ player: 0, cpu: 0 });
    setWinner(null);
    setPlayerY(5);
    setCpuY(5);
    resetBall(1);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'w', 's', 'W', 'S', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        setIsPaused(p => !p);
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setPlayerY(y => Math.max(0, y - 1));
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setPlayerY(y => Math.min(HEIGHT - PADDLE_HEIGHT, y + 1));
      } else if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isPaused || winner) return;

    const interval = setInterval(() => {
      setBall(prevBall => {
        let { x, y, dx, dy } = prevBall;
        const nextX = x + dx;
        const nextY = y + dy;

        // Top/Bottom wall bounce
        if (nextY <= 0 || nextY >= HEIGHT - 1) {
          dy = -dy;
          playBeep(350, 0.02, 'sine');
        }

        // CPU AI simple tracking
        setCpuY(currCpuY => {
          if (nextY > currCpuY + 1 && currCpuY < HEIGHT - PADDLE_HEIGHT) {
            return currCpuY + 1;
          } else if (nextY < currCpuY && currCpuY > 0) {
            return currCpuY - 1;
          }
          return currCpuY;
        });

        // Player paddle bounce (Left side at x = 1)
        if (nextX === 1) {
          const pY = playerYRef.current;
          if (nextY >= pY && nextY < pY + PADDLE_HEIGHT) {
            dx = 1;
            playBeep(520, 0.03, 'triangle');
            return { x: nextX, y: nextY, dx, dy };
          }
        }

        // CPU paddle bounce (Right side at x = WIDTH - 2)
        if (nextX === WIDTH - 2) {
          setCpuY(currCpuY => {
            if (nextY >= currCpuY && nextY < currCpuY + PADDLE_HEIGHT) {
              dx = -1;
              playBeep(480, 0.03, 'triangle');
            }
            return currCpuY;
          });
          return { x: nextX, y: nextY, dx: -1, dy };
        }

        // Left boundary loss
        if (nextX < 0) {
          playErrorSound();
          setScore(s => {
            const nextCpu = s.cpu + 1;
            if (nextCpu >= 5) setWinner('cpu');
            return { ...s, cpu: nextCpu };
          });
          resetBall(1);
          return { x: 18, y: 7, dx: 1, dy: 1 };
        }

        // Right boundary win point
        if (nextX >= WIDTH) {
          playSuccessSound();
          setScore(s => {
            const nextPlayer = s.player + 1;
            if (nextPlayer >= 5) setWinner('player');
            return { ...s, player: nextPlayer };
          });
          resetBall(-1);
          return { x: 18, y: 7, dx: -1, dy: 1 };
        }

        return { x: nextX, y: nextY, dx, dy };
      });
    }, 75);

    return () => clearInterval(interval);
  }, [isPaused, winner]);

  return (
    <div className="my-2 max-w-lg font-mono text-xs space-y-2 select-none">
      <div className="flex justify-between items-center pb-1 border-b border-[var(--border)]/40">
        <span className="font-bold text-sm text-[var(--accent)]">🏓 RETRO TERMINAL PONG</span>
        <div className="flex gap-4">
          <span>YOU: <strong className="text-[var(--accent-2)] text-sm">{score.player}</strong></span>
          <span>CPU: <strong className="text-[var(--error)] text-sm">{score.cpu}</strong></span>
        </div>
      </div>

      {/* Pong Arena */}
      <div
        className="grid gap-[1px] bg-black/50 border border-[var(--border)] p-1 rounded mx-auto"
        style={{
          gridTemplateColumns: `repeat(${WIDTH}, 1fr)`,
          width: '100%',
          aspectRatio: `${WIDTH} / ${HEIGHT}`
        }}
      >
        {Array.from({ length: HEIGHT }).map((_, y) =>
          Array.from({ length: WIDTH }).map((_, x) => {
            const isPlayerPaddle = x === 1 && y >= playerY && y < playerY + PADDLE_HEIGHT;
            const isCpuPaddle = x === WIDTH - 2 && y >= cpuY && y < cpuY + PADDLE_HEIGHT;
            const isBall = x === ball.x && y === ball.y;
            const isNet = x === Math.floor(WIDTH / 2) && y % 2 === 0;

            let cellClass = 'bg-transparent';
            if (isPlayerPaddle) cellClass = 'bg-[var(--accent-2)] shadow-[0_0_8px_var(--glow)]';
            else if (isCpuPaddle) cellClass = 'bg-[var(--error)] opacity-90';
            else if (isBall) cellClass = 'bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--glow)]';
            else if (isNet) cellClass = 'bg-[var(--border)]/30';

            return <div key={`${x}-${y}`} className={`w-full h-full ${cellClass}`} />;
          })
        )}
      </div>

      {winner && (
        <div className="text-center font-bold text-sm py-1 animate-bounce">
          {winner === 'player' ? (
            <span className="text-[var(--accent-2)]">🏆 VICTORY! You defeated the CPU!</span>
          ) : (
            <span className="text-[var(--error)]">💀 CPU WON! Press [R] to rematch.</span>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center text-[11px] text-[var(--muted)] pt-1">
        <span>Controls: <kbd className="px-1 border border-[var(--border)] rounded">W/S</kbd> or <kbd className="px-1 border border-[var(--border)] rounded">↑/↓</kbd> | First to 5</span>
        <div className="flex gap-2">
          <button
            onClick={resetGame}
            className="px-2 py-0.5 bg-[var(--highlight)] text-[var(--fg)] hover:text-[var(--accent)] border border-[var(--border)] rounded cursor-pointer"
          >
            Restart (R)
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
