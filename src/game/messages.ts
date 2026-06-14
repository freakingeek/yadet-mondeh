export function pickMessage(messages: string[], seed = 0) {
  if (messages.length === 0) return "";
  return messages[Math.abs(seed) % messages.length];
}
