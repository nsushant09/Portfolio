import { useEffect, useRef, type RefObject } from 'react';
import type { DotGridSettings } from '../domain/dotGrid';

interface RgbColor {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

interface Dot {
  readonly baseX: number;
  readonly baseY: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

interface PointerPosition {
  x: number;
  y: number;
  inside: boolean;
}

interface Shockwave {
  readonly x: number;
  readonly y: number;
  readonly startedAt: number;
}

function parseHexColor(hex: string): RgbColor {
  const normalized = hex.replace('#', '');
  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function mixColor(base: RgbColor, active: RgbColor, amount: number): string {
  const blend = Math.max(0, Math.min(1, amount));
  const red = Math.round(base.red + (active.red - base.red) * blend);
  const green = Math.round(base.green + (active.green - base.green) * blend);
  const blue = Math.round(base.blue + (active.blue - base.blue) * blend);
  return `rgb(${red} ${green} ${blue})`;
}

export function useDotGridFacade(settings: DotGridSettings): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context || !settings.enabled) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer: PointerPosition = { x: 0, y: 0, inside: false };
    let dots: Dot[] = [];
    let shockwaves: Shockwave[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastFrameTime = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const current = settingsRef.current;
      const step = Math.max(8, current.dotSize + current.gap);
      const columns = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;
      const left = (width - (columns - 1) * step) / 2;
      const top = (height - (rows - 1) * step) / 2;
      dots = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = left + column * step;
        const y = top + row * step;
        return { baseX: x, baseY: y, x, y, velocityX: 0, velocityY: 0 };
      });
      wake();
    };

    const render = (now: number) => {
      frameId = 0;
      const current = settingsRef.current;
      const elapsed = lastFrameTime === 0 ? 1 / 60 : (now - lastFrameTime) / 1000;
      const delta = Math.min(0.032, Math.max(0.001, elapsed));
      lastFrameTime = now;
      const baseColor = parseHexColor(current.baseColor);
      const activeColor = parseHexColor(current.activeColor);
      const pointerRadius = Math.max(1, current.proximity);
      const pointerStrength = current.strength;
      let stillMoving = false;

      context.clearRect(0, 0, width, height);
      shockwaves = shockwaves.filter(shock => now - shock.startedAt < 1000);

      for (const dot of dots) {
        let influence = 0;
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (!reducedMotion && pointer.inside) {
          const deltaX = pointer.x - dot.baseX;
          const deltaY = pointer.y - dot.baseY;
          const distance = Math.hypot(deltaX, deltaY);
          influence = Math.exp(-((distance / pointerRadius) ** 2) * 1.7);
          targetX += deltaX * influence * pointerStrength * 0.2;
          targetY += deltaY * influence * pointerStrength * 0.2;
        }

        let shockEnergy = 0;
        if (!reducedMotion) {
          for (const shock of shockwaves) {
            const deltaX = dot.baseX - shock.x;
            const deltaY = dot.baseY - shock.y;
            const distance = Math.hypot(deltaX, deltaY);
            const age = now - shock.startedAt;
            const waveFront = age * 0.42;
            const waveWidth = 28;
            const band = Math.exp(-(((distance - waveFront) / waveWidth) ** 2));
            const remaining = Math.max(0, 1 - age / 1000);
            const push = band * remaining * current.strength * 12;
            if (distance > 0.01) {
              targetX += (deltaX / distance) * push;
              targetY += (deltaY / distance) * push;
            }
            shockEnergy = Math.max(shockEnergy, band * remaining);
          }
        }

        const spring = 64;
        const damping = 15;
        dot.velocityX += ((targetX - dot.x) * spring - dot.velocityX * damping) * delta;
        dot.velocityY += ((targetY - dot.y) * spring - dot.velocityY * damping) * delta;
        dot.x += dot.velocityX * delta;
        dot.y += dot.velocityY * delta;

        if (Math.abs(targetX - dot.x) > 0.04 || Math.abs(targetY - dot.y) > 0.04 || Math.abs(dot.velocityX) > 0.06 || Math.abs(dot.velocityY) > 0.06) {
          stillMoving = true;
        }

        const energy = Math.min(1, Math.max(influence, shockEnergy));
        const radius = current.dotSize / 2 + energy * 1.25;
        context.globalAlpha = current.opacity * (0.62 + energy * 0.38);
        context.fillStyle = mixColor(baseColor, activeColor, Math.min(1, energy * 1.35));
        context.beginPath();
        context.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      if (stillMoving || shockwaves.length > 0) wake();
    };

    function wake() {
      if (frameId === 0) frameId = window.requestAnimationFrame(render);
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      pointer.x = x;
      pointer.y = y;
      pointer.inside = x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height;
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reducedMotion || !settingsRef.current.clickShock) return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return;
      shockwaves.push({ x, y, startedAt: performance.now() });
      if (shockwaves.length > 4) shockwaves = shockwaves.slice(-4);
      wake();
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        pointer.inside = false;
        wake();
      }
    };

    const onBlur = () => {
      pointer.inside = false;
      wake();
    };
    const onSettingsChange = () => wake();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener('dotgrid-settings-change', onSettingsChange);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerout', onPointerOut);
    window.addEventListener('blur', onBlur);
    resize();

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('dotgrid-settings-change', onSettingsChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', onBlur);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, [settings.enabled]);

  useEffect(() => {
    if (settings.enabled && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.dispatchEvent(new Event('dotgrid-settings-change'));
    }
  }, [settings.activeColor, settings.baseColor, settings.dotSize, settings.gap, settings.opacity, settings.proximity, settings.strength, settings.clickShock, settings.enabled]);

  return canvasRef;
}
