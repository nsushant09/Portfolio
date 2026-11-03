let lastFeedbackAt = 0;

export function triggerInteractionFeedback(): void {
  if (typeof navigator === 'undefined') return;

  const now = Date.now();
  if (now - lastFeedbackAt < 90) return;

  if (typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(8);
    } catch { /* Haptics may be unavailable or disabled by the browser. */ }
  }

  lastFeedbackAt = now;
}
