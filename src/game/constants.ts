import type { ChangeQuestionMode, GameSettings, RoundCount, TimerDuration } from "./types";

export const TIMER_OPTIONS: TimerDuration[] = [10, 15, 30, 45];
export const ROUND_OPTIONS: RoundCount[] = [3, 5, 10];
export const CHANGE_QUESTION_OPTIONS: ChangeQuestionMode[] = [1, 2, "unlimited"];

export const DEFAULT_BASE_POINTS = 10;
export const DEFAULT_CHANGE_PENALTY = 3;
export const MIN_TURN_POINTS = 1;

export const DEFAULT_SETTINGS: GameSettings = {
  timerSeconds: 15,
  rounds: 3,
  changeQuestionMode: 1,
  basePoints: DEFAULT_BASE_POINTS,
  changePenalty: DEFAULT_CHANGE_PENALTY,
};

export const SUCCESS_MESSAGES = [
  "ترکوندی! حافظه‌ات هنوز روشنه.",
  "فعلاً زنده موندی؛ جمعیت شوکه شد.",
  "آفرین! مغزت امروز استعفا نداده.",
  "قهرمان حافظه، همین الان از راه رسید.",
];

export const FAIL_MESSAGES = [
  "باختی! حافظه‌ات رفت مرخصی.",
  "آبروریزی شد، ولی هنوز دوستت داریم.",
  "این یکی رو باید تا تابستون بعد تمرین کنی.",
  "مغزت گفت من نبودم، دستم بود.",
  "با این جواب، حتی تقلب هم کمکت نمی‌کرد.",
];

export function formatChangeMode(mode: ChangeQuestionMode) {
  return mode === "unlimited" ? "نامحدود" : `${mode} بار`;
}
