import { For, Show } from "solid-js";
import type { Player } from "@/game/types";
import GameButton from "./GameButton";

type PlayerFormProps = {
  players: Player[];
  onUpdate: (id: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

export default function PlayerForm(props: PlayerFormProps) {
  return (
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-black text-white">بازیکن‌ها</h2>
          <p class="mt-1 text-xs text-slate-300">حداقل ۲ نفر. فقط اسم‌ها رو وارد کن.</p>
        </div>
        <GameButton type="button" variant="ghost" class="px-3 py-2 text-sm" onClick={props.onAdd}>
          + نفر
        </GameButton>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <For each={props.players}>
          {(player, index) => (
            <div class="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
              <div class="mb-2 flex items-center justify-between gap-2">
                <span class="text-xs font-black text-violet-200">بازیکن {index() + 1}</span>
                <Show when={props.players.length > 2}>
                  <button
                    type="button"
                    class="rounded-full bg-rose-500/15 px-2 py-1 text-[10px] font-bold text-rose-100 ring-1 ring-rose-300/20"
                    onClick={() => props.onRemove(player.id)}
                  >
                    حذف
                  </button>
                </Show>
              </div>
              <input
                class="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-4 focus:ring-violet-400/20"
                value={player.name}
                placeholder="اسم"
                autocomplete="off"
                onInput={event => props.onUpdate(player.id, event.currentTarget.value)}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
