import { MIN_TURN_POINTS } from "./constants";
import type { ChangeQuestionMode } from "./types";

export function canChangeQuestion(mode: ChangeQuestionMode, changesUsed: number) {
  return mode === "unlimited" || changesUsed < mode;
}

export function getPointsAfterQuestionChange(
  mode: ChangeQuestionMode,
  currentPoints: number,
  penalty: number,
) {
  if (mode === "unlimited") {
    return currentPoints;
  }

  return Math.max(MIN_TURN_POINTS, currentPoints - penalty);
}
