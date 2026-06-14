import type { Player } from "./types";

export function validatePlayers(players: Player[]) {
  const errors: string[] = [];
  const normalizedPlayers = players.map(player => ({
    ...player,
    name: player.name.trim(),
  }));

  if (normalizedPlayers.length < 2) {
    errors.push("حداقل دو بازیکن لازم داریم.");
  }

  if (normalizedPlayers.some(player => player.name.length === 0)) {
    errors.push("اسم همه بازیکن‌ها را وارد کن.");
  }

  return errors;
}
