import { useNavigate } from "@solidjs/router";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";
import PlayerForm from "@/components/game/PlayerForm";
import { useGame } from "@/game/state";
import { createEmptyPlayer } from "@/game/players";

export default function StartPlayers() {
  const navigate = useNavigate();
  const game = useGame();

  const updatePlayer = (id: string, value: string) => {
    const players = game.setupDraft.players.map(player => (player.id === id ? { ...player, name: value } : player));
    game.setSetupPlayers(players);
  };

  const addPlayer = () => {
    game.setSetupPlayers([...game.setupDraft.players, createEmptyPlayer(game.setupDraft.players.length + 1)]);
  };

  const removePlayer = (id: string) => {
    game.setSetupPlayers(game.setupDraft.players.filter(player => player.id !== id));
  };

  return (
    <main dir="rtl" lang="fa" class="min-h-screen px-4 py-4 text-white">
      <section class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col">
        <GameCard class="flex flex-1 flex-col gap-4 p-4">
          <div class="text-center">
            <p class="text-xs font-bold text-violet-200">مرحله ۱ از ۲</p>
            <h1 class="mt-1 text-3xl font-black">بازیکن‌ها</h1>
            <p class="mt-2 text-sm leading-7 text-slate-300">اسم همه رو وارد کن؛ بعد می‌ریم سراغ تنظیمات بازی.</p>
          </div>

          <PlayerForm players={game.setupDraft.players} onUpdate={updatePlayer} onAdd={addPlayer} onRemove={removePlayer} />

          <div class="mt-auto pt-1">
            <GameButton type="button" class="py-5 text-lg" full onClick={() => navigate("/start/settings")}>
              ادامه به تنظیمات
            </GameButton>
          </div>
        </GameCard>
      </section>
    </main>
  );
}
