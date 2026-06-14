import { createPlayerId } from "./ids";
import type { Player } from "./types";

export function createEmptyPlayer(_index: number): Player {
  return {
    id: createPlayerId(),
    name: "",
  };
}

export function normalizePlayer(player: Player): Player {
  return {
    ...player,
    name: player.name.trim(),
  };
}
