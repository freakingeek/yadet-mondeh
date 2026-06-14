import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";
import SettingsForm from "@/components/game/SettingsForm";
import { normalizePlayer } from "@/game/players";
import { useGame } from "@/game/state";
import { validatePlayers } from "@/game/validation";

export default function StartSettings() {
  const navigate = useNavigate();
  const game = useGame();
  const errors = () => validatePlayers(game.setupDraft.players.map(normalizePlayer));

  const startGame = () => {
    const normalizedPlayers = game.setupDraft.players.map(normalizePlayer);
    const validationErrors = validatePlayers(normalizedPlayers);
    if (validationErrors.length > 0) {
      return;
    }

    game.startGame(normalizedPlayers, game.setupDraft.settings);
    navigate("/play");
  };

  return (
    <main dir="rtl" lang="fa" class="min-h-screen px-4 py-4 text-white">
      <section class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col">
        <GameCard class="flex flex-1 flex-col gap-4 p-4">
          <div class="text-center">
            <p class="text-xs font-bold text-violet-200">مرحله ۲ از ۲</p>
            <h1 class="mt-1 text-3xl font-black">تنظیمات بازی</h1>
            <p class="mt-2 text-sm leading-7 text-slate-300">حالا زمان، راند و تعویض سؤال رو مشخص کن و بازی رو شروع کن.</p>
          </div>

          <SettingsForm settings={game.setupDraft.settings} onChange={game.setSetupSettings} />

          <Show when={errors().length > 0}>
            <div class="rounded-2xl border border-rose-300/30 bg-rose-500/10 px-4 py-3">
              <ul class="space-y-1 text-xs font-bold text-rose-100">
                <For each={errors()}>{error => <li>• {error}</li>}</For>
              </ul>
            </div>
          </Show>

          <div class="mt-auto grid gap-3 pt-1">
            <GameButton type="button" variant="secondary" full onClick={() => navigate("/start/players")}>
              برگشت به بازیکن‌ها
            </GameButton>
            <GameButton type="button" class="py-5 text-lg" full onClick={startGame}>
              شروع بازی
            </GameButton>
          </div>
        </GameCard>
      </section>
    </main>
  );
}
