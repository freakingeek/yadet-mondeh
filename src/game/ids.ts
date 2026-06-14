let nextId = 0;

export function createPlayerId() {
  nextId += 1;
  return `player-${Date.now()}-${nextId}`;
}
