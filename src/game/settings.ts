import { DEFAULT_SETTINGS } from "./constants";
import { loadStoredPlayerNames } from "./player-names-storage";
import { createEmptyPlayer } from "./players";
import type { GameSettings, SetupDraft } from "./types";

export function createDefaultSettings(): GameSettings {
  return { ...DEFAULT_SETTINGS };
}

function createPlayersFromNames(names: string[]) {
  return names.map((name, index) => ({
    ...createEmptyPlayer(index + 1),
    name,
  }));
}

export function createDefaultSetupDraft(): SetupDraft {
  const storedNames = loadStoredPlayerNames();
  const players =
    storedNames.length >= 2
      ? createPlayersFromNames(storedNames)
      : [createEmptyPlayer(1), createEmptyPlayer(2)];

  return {
    players,
    settings: createDefaultSettings(),
  };
}
