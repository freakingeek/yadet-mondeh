const STORAGE_KEY = "yadet-mondeh:player-names";

export function loadStoredPlayerNames(): string[] {
  if (typeof sessionStorage === "undefined") return [];

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((name): name is string => typeof name === "string");
  } catch {
    return [];
  }
}

export function saveStoredPlayerNames(names: string[]): void {
  if (typeof sessionStorage === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  } catch {
    // ignore quota or privacy mode errors
  }
}

export function clearStoredPlayerNames(): void {
  if (typeof sessionStorage === "undefined") return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
