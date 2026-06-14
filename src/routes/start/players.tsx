import { useNavigate } from "@solidjs/router";
import PageMeta from "@/components/PageMeta";
import GameButton from "@/components/game/GameButton";
import PlayerForm from "@/components/game/PlayerForm";
import { useGame } from "@/game/state";
import { createEmptyPlayer } from "@/game/players";

export default function StartPlayers() {
  const navigate = useNavigate();
  const game = useGame();
  const readyPlayersCount = () => game.setupDraft.players.filter(player => player.name.trim().length > 0).length;
  const canContinue = () => readyPlayersCount() >= 2;

  const updatePlayer = (id: string, value: string) => {
    game.updateSetupPlayerName(id, value);
  };

  const addPlayer = () => {
    game.setSetupPlayers([...game.setupDraft.players, createEmptyPlayer(game.setupDraft.players.length + 1)]);
  };

  const removePlayer = (id: string) => {
    game.setSetupPlayers(game.setupDraft.players.filter(player => player.id !== id));
  };

  return (
    <>
      <PageMeta
        title="بازیکن‌ها"
        description="بازیکن‌های یادت مونده؟ را وارد کن و جمع را برای شروع بازی آماده کن."
        path="/start/players"
      />
      <main dir="rtl" lang="fa" class="h-full overflow-hidden px-4 py-4 text-white">
      <section class="mx-auto flex h-full max-w-md min-h-0 flex-col gap-4">
        <div class="shrink-0 text-right">
          <p class="text-xs font-bold text-violet-200">مرحله ۱ از ۲</p>
          <p class="mt-2 text-sm leading-7 text-slate-300">اسم همه رو وارد کن؛ بعد می‌ریم سراغ تنظیمات بازی.</p>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto pb-2">
          <PlayerForm players={game.setupDraft.players} onUpdate={updatePlayer} onAdd={addPlayer} onRemove={removePlayer} />
        </div>

        <div class="shrink-0 pt-1">
          <div class="mb-3 flex items-center gap-3 rounded-2xl border border-amber-300/35 bg-amber-400/10 px-4 py-3 text-amber-100">
            <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-300/20 text-base font-black text-amber-200">
              i
            </div>
            <p class="text-right text-xs font-bold leading-6">برای ادامه حداقل اسم دو بازیکن را وارد کن.</p>
          </div>
          <GameButton
            type="button"
            class="py-5 text-lg"
            full
            disabled={!canContinue()}
            onClick={() => navigate("/start/settings")}
          >
            ادامه به تنظیمات
          </GameButton>
        </div>
      </section>
      </main>
    </>
  );
}
