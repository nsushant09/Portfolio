import React, { useState, useEffect, useCallback } from 'react';
import { playBeep, playErrorSound, playSuccessSound } from '../../utils/audio';

type Grid = number[][];

export const Game2048: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [grid, setGrid] = useState<Grid>(() => initGrid());
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('term_2048_highscore') || '0', 10);
  });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  function initGrid(): Grid {
    const newGrid: Grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    return newGrid;
  }

  function addRandomTile(g: Grid): boolean {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (g[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return false;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    g[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  const slideAndMergeRow = (row: number[]): { newRow: number[]; points: number } => {
    const nonZero = row.filter(val => val !== 0);
    const newRow: number[] = [];
    let points = 0;

    for (let i = 0; i < nonZero.length; i++) {
      if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
        const mergedVal = nonZero[i] * 2;
        newRow.push(mergedVal);
        points += mergedVal;
        i++;
      } else {
        newRow.push(nonZero[i]);
      }
    }

    while (newRow.length < 4) {
      newRow.push(0);
    }

    return { newRow, points };
  };

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;

    let pointsGained = 0;
    const newGrid: Grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    let hasChanged = false;

    if (direction === 'left' || direction === 'right') {
      for (let r = 0; r < 4; r++) {
        const row = grid[r];
        const targetRow = direction === 'left' ? [...row] : [...row].reverse();
        const { newRow, points } = slideAndMergeRow(targetRow);
        const finalRow = direction === 'left' ? newRow : newRow.reverse();

        for (let c = 0; c < 4; c++) {
          newGrid[r][c] = finalRow[c];
          if (newGrid[r][c] !== grid[r][c]) hasChanged = true;
        }
        pointsGained += points;
      }
    } else {
      for (let c = 0; c < 4; c++) {
        const col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
        const targetCol = direction === 'up' ? [...col] : [...col].reverse();
        const { newRow: newCol, points } = slideAndMergeRow(targetCol);
        const finalCol = direction === 'up' ? newCol : newCol.reverse();

        for (let r = 0; r < 4; r++) {
          newGrid[r][c] = finalCol[r];
          if (newGrid[r][c] !== grid[r][c]) hasChanged = true;
        }
        pointsGained += points;
      }
    }

    if (hasChanged) {
      addRandomTile(newGrid);
      playBeep(440 + pointsGained * 5, 0.04, 'triangle');
      setGrid(newGrid);
      setScore(s => {
        const nextScore = s + pointsGained;
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem('term_2048_highscore', String(nextScore));
        }
        return nextScore;
      });

      // Check win condition
      if (!won && newGrid.some(row => row.some(val => val >= 2048))) {
        setWon(true);
        playSuccessSound();
      }

      // Check game over
      if (checkGameOver(newGrid)) {
        setGameOver(true);
        playErrorSound();
      }
    }
  }, [grid, gameOver, highScore, won]);

  function checkGameOver(g: Grid): boolean {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (g[r][c] === 0) return false;
        if (r < 3 && g[r][c] === g[r + 1][c]) return false;
        if (c < 3 && g[r][c] === g[r][c + 1]) return false;
      }
    }
    return true;
  }

  const resetGame = () => {
    setGrid(initGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') move('left');
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') move('right');
      else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') move('up');
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') move('down');
      else if (e.key === 'r' || e.key === 'R') resetGame();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const getTileStyle = (val: number) => {
    if (val === 0) return 'bg-black/30 border-[var(--border)]/50 text-transparent';
    if (val === 2) return 'bg-[var(--highlight)] text-[var(--fg)] border-[var(--border)] font-bold';
    if (val === 4) return 'bg-[var(--highlight)] text-[var(--accent)] border-[var(--accent)]/50 font-bold';
    if (val === 8) return 'bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)] font-bold';
    if (val === 16) return 'bg-[var(--accent-2)]/20 text-[var(--accent-2)] border-[var(--accent-2)] font-bold';
    if (val === 32) return 'bg-[var(--warning)]/20 text-[var(--warning)] border-[var(--warning)] font-bold';
    if (val === 64) return 'bg-[var(--error)]/20 text-[var(--error)] border-[var(--error)] font-bold';
    if (val >= 128 && val < 1024) return 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)] font-black shadow-[0_0_10px_var(--glow)]';
    return 'bg-[var(--accent-2)] text-[var(--bg)] border-[var(--accent-2)] font-black shadow-[0_0_15px_var(--glow)]';
  };

  return (
    <div className="my-2 max-w-sm font-mono text-xs space-y-2 select-none">
      <div className="flex justify-between items-center pb-1 border-b border-[var(--border)]/40">
        <span className="font-bold text-sm text-[var(--accent)]">🔢 TERMINAL 2048</span>
        <div className="flex gap-3">
          <span>Score: <strong className="text-[var(--accent-2)]">{score}</strong></span>
          <span>Best: <strong className="text-[var(--warning)]">{highScore}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 p-2 bg-black/40 border border-[var(--border)] rounded aspect-square">
        {grid.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`flex items-center justify-center rounded border text-sm sm:text-base transition-all duration-100 ${getTileStyle(val)}`}
            >
              {val > 0 ? val : ''}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex flex-wrap justify-between items-center text-[11px] text-[var(--muted)] gap-2">
        <span>Controls: <kbd className="px-1 border border-[var(--border)] rounded">WASD</kbd> or <kbd className="px-1 border border-[var(--border)] rounded">Arrows</kbd></span>
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

      {won && !gameOver && (
        <div className="mt-2 text-center text-[var(--accent-2)] font-bold animate-bounce">
          🎉 YOU REACHED 2048! Keep playing for higher scores.
        </div>
      )}

      {gameOver && (
        <div className="mt-2 text-center text-[var(--error)] font-bold animate-bounce">
          💀 GAME OVER! Press [R] or click Restart.
        </div>
      )}
    </div>
  );
};
