import { A, useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";
import Scoreboard from "@/components/game/Scoreboard";
import { getWinners } from "@/game/ranking";
import { useGame } from "@/game/state";

export default function Summary() {
  const game = useGame();
  const navigate = useNavigate();

  const backHome = () => {
    game.resetGame();
    navigate("/");
  };

  const playAgain = () => {
    game.restartSameSettings();
    navigate("/play");
  };

  return (
    <Show
      when={game.session}
      fallback={
        <main dir="rtl" lang="fa" class="h-full overflow-hidden px-4 py-8 text-white">
          <section class="mx-auto flex h-full max-w-md flex-col justify-center text-center">
            <GameCard>
              <p class="text-5xl">🤷‍♂️</p>
              <h1 class="mt-5 text-3xl font-black">هنوز نتیجه‌ای نداریم</h1>
              <p class="mt-3 leading-8 text-slate-300">اول یه بازی کامل کن، بعد بیا اینجا پُز بده.</p>
              <A href="/start" class="mt-6 block">
                <GameButton full>شروع بازی</GameButton>
              </A>
            </GameCard>
          </section>
        </main>
      }
    >
      {session => (
        <main dir="rtl" lang="fa" class="h-full overflow-hidden px-4 py-8 text-white">
          <section class="mx-auto flex h-full max-w-md flex-col gap-5">
            <GameCard class="text-center">
              <p class="text-6xl">👑</p>
              <p class="mt-4 text-sm font-bold text-violet-200">نتیجه نهایی</p>
              <h1 class="mt-2 text-4xl font-black">برنده بازی</h1>
              <div class="mt-5 rounded-[2rem] bg-violet-400/15 p-5 ring-1 ring-violet-200/20">
                <For each={getWinners(session())}>
                  {winner => <p class="text-3xl font-black text-white">{winner.name}</p>}
                </For>
                <p class="mt-2 text-sm text-slate-300">
                  {getWinners(session()).length > 1 ? "مساوی شد! جمعاً همه مشکوکین." : "بقیه می‌تونن برن تمرین حافظه."}
                </p>
              </div>
            </GameCard>

            <GameCard>
              <h2 class="mb-4 text-xl font-black text-white">جدول امتیازها</h2>
              <Scoreboard session={session()} />
            </GameCard>

            <div class="mt-auto grid gap-3">
              <GameButton type="button" full onClick={playAgain}>
                دوباره با همین تنظیمات
              </GameButton>
              <GameButton type="button" variant="secondary" full onClick={backHome}>
                برگشت به خانه
              </GameButton>
            </div>
          </section>
        </main>
      )}
    </Show>
  );
}
