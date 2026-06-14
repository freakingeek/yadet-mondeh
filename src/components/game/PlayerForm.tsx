import { Plus, Trash2 } from "lucide-solid";
import { For, Show } from "solid-js";
import type { Player } from "@/game/types";

type PlayerFormProps = {
  players: Player[];
  onUpdate: (id: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

export default function PlayerForm(props: PlayerFormProps) {
  return (
    <div class="space-y-3">
      <div class="space-y-2">
        <For each={props.players}>
          {(player, index) => (
            <div class="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
              <div class="mb-2 flex items-center justify-between gap-2">
                <span class="text-xs font-black text-violet-200">بازیکن {index() + 1}</span>
                <Show when={props.players.length > 2}>
                  <button
                    type="button"
                    aria-label="حذف بازیکن"
                    class="grid h-8 w-8 place-items-center rounded-full bg-rose-500/15 text-rose-100 ring-1 ring-rose-300/20 transition hover:bg-rose-500/25"
                    onClick={() => props.onRemove(player.id)}
                  >
                    <Trash2 size={14} />
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

        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm font-black text-slate-100 transition hover:bg-white/10 active:scale-[0.98]"
          onClick={props.onAdd}
        >
          <Plus size={18} />
          <span>بازیکن جدید</span>
        </button>
      </div>
    </div>
  );
}
