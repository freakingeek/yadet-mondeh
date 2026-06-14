import type { GameSession, Player } from "./types";

export type RankedPlayer = Player & {
  score: number;
};

export function getRankedPlayers(session: GameSession): RankedPlayer[] {
  return [...session.players]
    .map(player => ({ ...player, score: session.scores[player.id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "fa"));
}

export function getWinners(session: GameSession): RankedPlayer[] {
  const rankedPlayers = getRankedPlayers(session);
  const topScore = rankedPlayers[0]?.score ?? 0;
  return rankedPlayers.filter(player => player.score === topScore);
}
