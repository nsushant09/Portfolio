let lastFeedbackAt = 0;
let audioContext: AudioContext | null = null;

function playSubtleTick(): void {
  if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return;

  try {
    audioContext ??= new window.AudioContext();
    const context = audioContext;
    const play = () => {
      if (context.state !== 'running') return;

      const oscillator = context.createOscillator();
      const volume = context.createGain();
      const startedAt = context.currentTime;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(980, startedAt);
      oscillator.frequency.exponentialRampToValueAtTime(760, startedAt + 0.028);
      volume.gain.setValueAtTime(0.0001, startedAt);
      volume.gain.exponentialRampToValueAtTime(0.018, startedAt + 0.004);
      volume.gain.exponentialRampToValueAtTime(0.0001, startedAt + 0.038);
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start(startedAt);
      oscillator.stop(startedAt + 0.04);
    };

    if (context.state === 'running') {
      play();
    } else {
      void context.resume().then(play).catch(() => undefined);
    }
  } catch {
    // Audio can be unavailable or blocked by browser preferences.
  }
}

export function triggerInteractionFeedback(): void {
  if (typeof navigator === 'undefined') return;

  const now = Date.now();
  if (now - lastFeedbackAt < 90) return;

  let vibrationStarted = false;
  if (typeof navigator.vibrate === 'function') {
    try {
      vibrationStarted = navigator.vibrate(8);
    } catch {
      vibrationStarted = false;
    }
  }

  if (!vibrationStarted) playSubtleTick();
  lastFeedbackAt = now;
}
