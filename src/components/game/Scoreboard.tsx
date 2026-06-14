import { For } from "solid-js";
import { getRankedPlayers } from "@/game/ranking";
import type { GameSession } from "@/game/types";

type ScoreboardProps = {
  session: GameSession;
  compact?: boolean;
};

export default function Scoreboard(props: ScoreboardProps) {
  const rankedPlayers = () => getRankedPlayers(props.session);

  return (
    <div class="space-y-3">
      <For each={rankedPlayers()}>
        {(player, index) => (
          <div class="flex items-center justify-between gap-3 rounded-2xl bg-slate-950/45 px-4 py-3 ring-1 ring-white/10">
            <div class="flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-violet-400 text-sm font-black text-slate-950">
                {index() + 1}
              </span>
              <p class="font-black text-white">{player.name}</p>
            </div>
            <strong class={`${props.compact ? "text-xl" : "text-2xl"} text-violet-200`}>{player.score}</strong>
          </div>
        )}
      </For>
    </div>
  );
}
