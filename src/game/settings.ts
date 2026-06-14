import { DEFAULT_SETTINGS } from "./constants";
import type { GameSettings, SetupDraft } from "./types";
import { createEmptyPlayer } from "./players";

export function createDefaultSettings(): GameSettings {
  return { ...DEFAULT_SETTINGS };
}

export function createDefaultSetupDraft(): SetupDraft {
  return {
    players: [createEmptyPlayer(1), createEmptyPlayer(2)],
    settings: createDefaultSettings(),
  };
}
