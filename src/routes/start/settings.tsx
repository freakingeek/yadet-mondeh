import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import PageMeta from "@/components/PageMeta";
import GameButton from "@/components/game/GameButton";
import SettingsForm from "@/components/game/SettingsForm";
import { normalizePlayer } from "@/game/players";
import { useMusic } from "@/providers/music";
import { useGame } from "@/providers/game";
import { validatePlayers } from "@/game/validation";

export default function StartSettings() {
  const navigate = useNavigate();
  const game = useGame();
  const music = useMusic();
  const errors = () => validatePlayers(game.setupDraft.players.map(normalizePlayer));

  const startGame = () => {
    const normalizedPlayers = game.setupDraft.players.map(normalizePlayer);
    const validationErrors = validatePlayers(normalizedPlayers);
    if (validationErrors.length > 0) {
      return;
    }

    game.startGame(normalizedPlayers, game.setupDraft.settings);
    music.startForGame();
    navigate("/play");
  };

  return (
    <>
      <PageMeta
        title="تنظیم بازی"
        description="زمان، تعداد دورها و قوانین تعویض سؤال را برای شروع بازی یادت مونده؟ مشخص کن."
        path="/start/settings"
      />
      <main dir="rtl" lang="fa" class="h-full overflow-hidden px-4 py-4 text-white">
        <section class="mx-auto flex h-full max-w-md flex-col gap-4">
        <div class="text-right">
          <p class="text-xs font-bold text-violet-200">مرحله ۲ از ۲</p>
          <p class="mt-2 text-sm leading-7 text-slate-300">حالا زمان، دور و تعویض سؤال رو مشخص کن و بازی رو شروع کن.</p>
        </div>

        <SettingsForm settings={game.setupDraft.settings} onChange={game.setSetupSettings} />

        <Show when={errors().length > 0}>
          <div class="rounded-2xl border border-rose-300/30 bg-rose-500/10 px-4 py-3">
            <ul class="space-y-1 text-xs font-bold text-rose-100">
              <For each={errors()}>{error => <li>• {error}</li>}</For>
            </ul>
          </div>
        </Show>

        <div class="mt-auto pt-1">
          <GameButton type="button" class="py-5 text-lg" full onClick={startGame}>
            شروع بازی
          </GameButton>
        </div>
        </section>
      </main>
    </>
  );
}
