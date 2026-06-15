export type PlaybackRateInput = {
  remainingSeconds: number;
  totalSeconds: number | "unlimited";
};

const MAX_PLAYBACK_RATE = 1.35;

export function getPlaybackRate({ remainingSeconds, totalSeconds }: PlaybackRateInput) {
  if (totalSeconds === "unlimited") {
    return 1;
  }

  const clampedRemaining = Math.max(0, Math.min(totalSeconds, remainingSeconds));
  const elapsedRatio = 1 - clampedRemaining / totalSeconds;
  const rampStart = 0.4;

  if (elapsedRatio <= rampStart) {
    return 1;
  }

  const rampProgress = (elapsedRatio - rampStart) / (1 - rampStart);
  return 1 + (MAX_PLAYBACK_RATE - 1) * rampProgress;
}
